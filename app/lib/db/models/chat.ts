"use server"
import mongoose, { Model } from "mongoose";
import { Message, MessageModel } from "./message";
import { User, UserModel } from "./user";

export interface IChat extends Document {
  _id: string;
  type: "private" | "group";
  participants: Array<mongoose.Types.ObjectId>;
  messages: Array<mongoose.Types.ObjectId>;
  lastMessage?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  contractAddress?: string;

}
export interface ChatModel extends Model<IChat> {
  getChat(data: { userId: string; user2Id: string }): Promise<IChat>;
  getChats(data: { userId: string }): Promise<Array<IChat>>;
  createChat(data: {
    type: "private" | "group";
    participants: Array<
   string
    >;
  }): Promise<IChat>;
}
const chatSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["private", "group"],
    required: true
  },
  participants: [{
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User',
      required: true
  
  }],
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  }],
  lastMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  },
  contractAddress: String
}, {
  timestamps: true,
  
  indexes: [
    { 'participants': 1 },
    { updatedAt: -1 }
  ]
});
// Create a compound index for participants in private chats
chatSchema.index({
  type: 1,
  'participants': 1
}, {
  unique: true,
  partialFilterExpression: { 
    type: 'private',
    'participants': { $size: 2 } // Only apply to private chats with exactly 2 participants
  }
});

// Add pre-save middleware to sort participant IDs consistently
chatSchema.pre('save', function(next) {
  if (this.type === 'private' && this.participants.length === 2) {
    // Sort participant IDs to ensure consistent ordering
    this.participants.sort((a, b) => 
      a.toString().localeCompare(b.toString())
    );
  }
  next();
});


chatSchema.statics.getChats = async function ({
  userId
}: {
  userId: string;
}) {
  try {
    const chat = await this.find({
      "participants": userId,
    })
      .sort({ updatedAt: -1 })
      .populate('participants')
      .populate('lastMessage', 'content timestamp deliveryStatus')
      .lean();

    return chat;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
// Modify createChat to handle potential duplicates
chatSchema.statics.createChat = async function ({
  type,
  participants,
}: {
  type: "private" | "group";
  participants: Array<string>;
}) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const participantIds = participants.map(p => new mongoose.Types.ObjectId(p));

    if (type === 'private' && participants.length === 2) {
      // Check for existing chat first
      const existingChat = await this.findOne({
        type: 'private',
        'participants': { $all: participantIds }
      }).session(session);

      if (existingChat) {
        await session.commitTransaction();
        return existingChat;
      }
    }

    // Create the new chat
    const chat = await this.create([{
      type,
      participants: participantIds
    }], { session });

    // Update all participants' chat arrays
    await User.updateMany(
      { _id: { $in: participantIds } },
      { $addToSet: { chats: chat[0]._id } },
      { session }
    );

    await session.commitTransaction();
    return chat[0];

  } catch (error) {
    await session.abortTransaction();
    
    if (error.code === 11000) { // Duplicate key error
      // Handle race condition - try to fetch the existing chat
      const participantIds = participants.map(p => new mongoose.Types.ObjectId(p));
      return await this.findOne({
        type: 'private',
        'participants.userId': { $all: participantIds }
      });
    }
    console.error('Error in createChat:', error);
    throw error;
  } finally {
    session.endSession();
  }
};
// Enhanced Chat methods
chatSchema.statics.getChat = async function ({ userId,user2Id }: { userId: string,user2Id:string }) {
  const parsedUserId = new mongoose.Types.ObjectId(userId);
  const parsedUser2Id = new mongoose.Types.ObjectId(user2Id);
  try {
    return await this.findOne({
      type: "private",
      "participants": { $all: [parsedUserId,parsedUser2Id] }
    })
    .sort({ updatedAt: -1 })
    .populate('participants', 'username avatar status')
    .populate({
      path: 'messages',
      options: { 
        sort: { timestamp: 1 }
      }
    })
    .lean();
  } catch (error) {
    console.error(error);
    return error;
  }
};

// Method to mark all messages in a chat as read
chatSchema.methods.markAllAsRead = async function(userId: string) {
  const messages = await (Message as MessageModel).find({
    chat: this._id,
    'receiver._id': userId,
    deliveryStatus: { $ne: "read" }
  });

  const updates = messages.map(message => 
    (Message as MessageModel).updateDeliveryStatus(message._id, "read")
  );

  await Promise.all(updates);
};

// Add method to get or create chat
chatSchema.statics.getOrCreateChat = async function({
  userId1,
  userId2
}: {
  userId1: string;
  userId2: string;
}) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // First try to find existing chat
    let chat = await this.findOne({
      type: "private",
      "participants.userId": { 
        $all: [userId1, userId2] 
      }
    }).session(session);

    if (!chat) {
      // Get user details for both participants
      const [user1, user2] = await Promise.all([
        (User as UserModel).findById(userId1).select('username walletAddress avatar').lean(),
        (User as UserModel).findById(userId2).select('username walletAddress avatar').lean()
      ]);

      if (!user1 || !user2) {
        throw new Error("One or both users not found");
      }

      // Create new chat
      const newChat = await this.create([{
        type: "private",
        participants: [
          {
            userId: user1._id,
            username: user1.username,
            walletAddress: user1.walletAddress,
            avatar: user1.avatar
          },
          {
            userId: user2._id,
            username: user2.username,
            walletAddress: user2.walletAddress,
            avatar: user2.avatar
          }
        ]
      }], { session });

      // Add chat reference to both users
      await User.updateMany(
        { _id: { $in: [userId1, userId2] } },
        { $push: { chats: newChat[0]._id } },
        { session }
      );

      chat = newChat[0];
    }

    await session.commitTransaction();
    return chat;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

// Add method to get chat history
chatSchema.statics.getChatHistory = async function({
  userId,
  limit = 20,
  before = new Date()
}) {
  const chats = await this.find({
    "participants.userId": userId,
    updatedAt: { $lt: before }
  })
  .sort({ updatedAt: -1 })
  .limit(limit)
  .populate({
    path: 'messages',
    options: { 
      sort: { timestamp: -1 },
      limit: 1
    }
  })
  .lean();

  return chats;
};

export const Chat =
  (mongoose.models.Chat  || mongoose.model<IChat, ChatModel>("Chat", chatSchema))as ChatModel;
