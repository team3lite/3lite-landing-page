"use server";
import mongoose, { Model } from "mongoose";
import { Chat, ChatModel, IChat } from "./chat";
import { FirebaseChat } from "../../../class/firebase_chat";
import { User } from "./user";


export interface IMessage extends Document {
  _id: string;
  chat: mongoose.Types.ObjectId;
  sender: mongoose.Types.ObjectId;
  receiver: mongoose.Types.ObjectId;
  content: string;
  contentType: "text" | "image" | "file";
  timestamp: Date;
  deliveryStatus: "sent" | "delivered" | "read";
  deliveredAt?: Date;
  readAt?: Date;
  transactionHash?: string;
  blockchainStatus?: "pending" | "confirmed";
}

// models/Message.ts
const messageSchema = new mongoose.Schema<IMessage, MessageModel>({
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat",
    required: true,
   
    index: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  contentType: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  deliveryStatus: {
    type: String,
    enum: ["sent", "delivered", "read"],
    default: "sent",
  },
  deliveredAt: Date,
  readAt: Date,
  transactionHash: String,
  blockchainStatus: {
    type: String,
    enum: ["pending", "confirmed"],
    default: "pending",
  },
});


// Add pre-save middleware to sort participant IDs consistently

export interface MessageModel extends Model<IMessage> {
  getMessages(data: {
    chatId: string;
    limit?: number;
  }): Promise<Array<IMessage> | Error>;
  addMessage(data: {
    chatId: string | null;
    sender: string;
    receiver: string;

    content: string;
    contentType: "text" | "image" | "file";
  }): Promise<{
    message: IMessage;
    chat: IChat;
    isNewChat: boolean;
  }>;
  updateDeliveryStatus(
    messageId: string,
    status: "delivered" | "read"
  ): Promise<IMessage>;
  getUnreadCount(userId: string): Promise<number>;
}

messageSchema.statics.getMessages = async function ({
  chatId,
  limit = 50,
  before,
}: {
  chatId: string;
  limit?: number;
  before?: string;
}) {
  const query: any = { chatId };
  if (before) {
    query.timestamp = { $lt: new Date(before as string) };
  }
  const messages = await this.find(query)
    .sort({ timestamp: -1 })
    .limit(Number(limit))
    .lean();
  // Include total count for pagination info
  const totalCount = await Message.countDocuments({ chatId });

  return {
    messages,
    hasMore: messages.length === Number(limit),
    totalCount,
  };
};

// Enhanced Message methods
messageSchema.statics.addMessage = async function ({
  chatId = null,
  sender,
  receiver,
  content,
  contentType,
}: {
  chatId?: string | null;
  sender: string;
  receiver: string;
  content: string;
  contentType: "text" | "image" | "file";
}) {
  const session = await mongoose.startSession();
  session.startTransaction();
  const participantIds = [sender, receiver].map(
    (p) => new mongoose.Types.ObjectId(p)
  );
  try {
    let isNewChat=false;
    let chat = await Chat.findOne(
      {
        type: "private",
        participants: { $all: participantIds },
      }
  
    );
    if(!chat){
      chat= await Chat.create({
        type: "private",
        participants:participantIds,
      });
      isNewChat=true;
    }

    
    if (isNewChat) {
      // Bulk update users to add the new chat

      await User.updateMany(
        { _id: { $in: participantIds } },
        {
          $push: { chats: chat._id },
          $set: { updatedAt: new Date() },
        },
        {
          session,
          multi: true,
        }
      );
    }

   console.log("creating..")
    // Create message
    const message: Array<IMessage> = await this.create(
      [
        {
          chat:chat._id,
          sender,
          receiver,
          content,
          contentType,
          deliveryStatus: "sent",
          timestamp: new Date(),
        },
      ],
      { session }
    );
    console.log("created")
    // Update chat with new message
  const chatDoc =   await Chat.findByIdAndUpdate(
     chat._id,
      {
        $push: { messages: message[0]._id },
        lastMessage:  message[0]._id ,
        updatedAt: new Date(),
      },
      {new:true, session }
    );
    // Update sender's sent messages and receiver's received messages
    await Promise.all([
      User.findByIdAndUpdate(
        sender,
        {
          $push: { sentMessages: message[0]._id },
          $set: { updatedAt: new Date() },
        },
        { session }
      ),
      User.findByIdAndUpdate(
        receiver,
        {
          $push: { receivedMessages: message[0]._id },
          $set: { updatedAt: new Date() },
        },
        { session }
      ),
    ]);
    // Sync with Firebase
    if (chat) {
    
      await FirebaseChat.syncChat(chat);
      await FirebaseChat.syncMessage( message[0]);
    }
    await session.commitTransaction();
    return {
      message: message[0],
      chat:chatDoc,
      isNewChat: isNewChat,
    };
  } catch (error) {
    console.log("error creating")
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};
// Method to update message delivery status
messageSchema.statics.updateDeliveryStatus = async function (
  messageId: string,
  status: "delivered" | "read"
) {
  const newId=new mongoose.Types.ObjectId(messageId);
  const message = await this.findById(newId);
  if (!message) throw new Error("Message not found");

  const updateData: any = {
    deliveryStatus: status,
  };

  if (status === "delivered") {
    updateData.deliveredAt = new Date();
  } else if (status === "read") {
    updateData.readAt = new Date();
  
  }

  // Update message status
  let mess=await this.findByIdAndUpdate(newId, updateData,{new:true});

  // Sync with Firebase
  // const filteredMessage = {
  //   _id: mess._id.toString(),
  //   chat: mess.chat.toString(),
  //   sender: mess.sender.toString(),
  //   receiver: mess.receiver.toString(),
  //   content: mess.content,
  //   contentType: mess.contentType,
  //   timestamp: mess.timestamp,
  //   deliveryStatus: mess.deliveryStatus,
  //   deliveredAt: mess.deliveredAt,
  //   readAt: mess.readAt,
  //   transactionHash: mess.transactionHash,
  // } 
  await FirebaseChat.syncMessage(mess);

  return mess;
};

// Method to get unread messages count for a user
messageSchema.statics.getUnreadCount = async function (userId: string) {
  const newId=new mongoose.Types.ObjectId(userId);
  const resp=await this.countDocuments({
    receiver: newId,
    deliveryStatus: { $ne: "read" },
  });
  return resp;
};
// Add method to get messages between two users
messageSchema.statics.getMessagesBetweenUsers = async function ({
  userId1,
  userId2,
  limit = 50,
  before = new Date(),
}) {
  // First find the chat between these users
  const chat = await (Chat as ChatModel).findOne({
    type: "private",
    "participants.userId": {
      $all: [userId1, userId2],
    },
  });

  if (!chat) {
    return [];
  }

  return this.find({
    chat: chat._id,
    timestamp: { $lt: before },
  })
    .sort({ timestamp: -1 })
    .limit(limit)
    .lean();
};
export const Message = 
(mongoose.models.Message<MessageModel> ||
  mongoose.model<IMessage, MessageModel>(
    "Message",
    messageSchema
  )) as MessageModel;


