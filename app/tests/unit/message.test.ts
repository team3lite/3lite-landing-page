import mongoose from "mongoose";
import { Message, IMessage } from "../../lib/db/models/message"; // Adjust import path
import { User, Users } from "../../lib/db/models/user";
import { Chat, IChat } from "../../lib/db/models/chat";
import { FirebaseChat } from "../../class/firebase_chat";
import { MongoMemoryReplSet } from "mongodb-memory-server";
import { IuserData } from "./user.test";
// Mock dependencies
jest.mock("../../class/firebase_chat", () => ({
  FirebaseChat: {
    syncChat: jest.fn(),
    syncMessage: jest.fn(),
  },
}));

const receiverData: IuserData = {
  username: "receiver",
  walletType: "solflare",
  status: "online",
    connectionTimestamp: new Date(),
  lastSeen: new Date(),
  walletAddress: "receiverwallet",
};

const senderData: IuserData = {
  walletType: "sender@test.com",
  username: "sender",
  connectionTimestamp: new Date(),
  status: "online",
  lastSeen: new Date(),
  walletAddress: "senderWallt",
};

describe("Message Model", () => {
  let replSet: MongoMemoryReplSet|null=null;
  beforeAll(async () => {
    // Create an in-memory MongoDB server
    replSet = await MongoMemoryReplSet.create({
      replSet: { count: 1 }, // Number of members in the replica set
      
    });
    const uri = replSet.getUri(); // Get the connection URI for the replica set
 // Connect Mongoose with replica set support
    await mongoose.connect(uri);
    await replSet.waitUntilRunning();
    // mongoose.set('', true);

  });

  afterAll(async () => {
    // Disconnect and stop the in-memory server after tests

    await mongoose.disconnect();
    replSet&&await replSet.stop();
  });

  beforeEach(async () => {
    // Clear collections before each test
    const isPrimary = await mongoose.connection.db.admin().command({ isMaster: 1 });
if (!isPrimary.ismaster) {
  throw new Error("Not connected to the primary node");
}
    await User.deleteMany({});
    await Chat.deleteMany({});
    await Message.deleteMany({});
  });

  describe("addMessage method", () => {
    it("should create exactly one new chat document when sending first message", async () => {
      // Create users
      const sender = await User.createUser(senderData);
      const receiver = await User.create(receiverData);
      
      // Get initial chat count
      const initialChatCount = await Chat.countDocuments();
      
      // Add first message
      const response = await Message.addMessage({
        chatId: null,
        sender: sender._id,
        receiver: receiver._id, 
        content: "First message",
        contentType: "text"
      });

      // Add second message between same users
      const initialMessageCount = await Message.countDocuments();
      const response2 = await Message.addMessage({
        chatId: null,
        sender: sender._id,
        receiver: receiver._id,
        content: "Second message", 
        contentType: "text"
      });

      // Get final chat count
      const finalMessageCount = await Message.countDocuments();

      // Assertions
      expect(initialChatCount).toBe(0);
      expect(initialMessageCount).toBe(1);
      expect(finalMessageCount).toBe(2);
      expect(response.isNewChat).toBe(true);
      expect(response2.isNewChat).toBe(false);
      expect(response2.chat._id).toEqual(response.chat._id);
      
      // Verify chat has both messages
      const chat = await Chat.findById(response.chat._id);
      expect(chat?.messages).toHaveLength(2);
      expect(chat?.messages).toContainEqual(response.message._id);
      expect(chat?.messages).toContainEqual(response2.message._id);

      // Verify users are linked to same chat
      const updatedSender = await User.findById(sender._id);
      const updatedReceiver = await User.findById(receiver._id);
      expect(updatedSender?.chats).toHaveLength(1);
      expect(updatedReceiver?.chats).toHaveLength(1);
      expect(updatedSender?.chats[0]).toEqual(response.chat._id);
      expect(updatedReceiver?.chats[0]).toEqual(response.chat._id);
    }, 45000);

    it("should add message to existing chat", async () => {
      // Create chat and users
      const sender = await User.create(senderData);

      const receiver = await User.create(receiverData);

      const existingChat = await Chat.createChat({
        type: "private",
        participants: [sender._id, receiver._id ],
      });

      // Add message to existing chat
      const message = await Message.addMessage({
        chatId: existingChat._id.toString(),
        sender: sender._id.toString(),
        receiver: receiver._id.toString(),
        content: "Follow-up message",
        contentType: "text",
      });

      // Assertions
      expect(message).toBeDefined();
      expect(message.chat._id).toEqual(existingChat._id);
      //   expect(result.isNewChat).toBe(false);
    },45000);
  });

  describe("updateDeliveryStatus method", () => {
    it("should update message delivery status", async () => {
      // Create message
      const sender = await User.create(senderData);

      const receiver = await User.create(receiverData);

      const chat = await Chat.createChat({
        type: "private",
        participants: [sender._id,  receiver._id ],
      });

      const message = await Message.addMessage({
        chatId: chat._id,
        sender: sender._id,
        receiver:receiver._id,
        content: "Test message",
        contentType: "text",
      });

      // Update status
      const updatedMessage = await Message.updateDeliveryStatus(
        message.message._id,
        "delivered"
      );

      // Assertions
      expect(updatedMessage.deliveryStatus).toBe("delivered");
      expect(updatedMessage.deliveredAt).toBeDefined();
      expect(FirebaseChat.syncMessage).toHaveBeenCalled();
    },45000);
  });

  describe("getUnreadCount method", () => {
    it("should return correct unread message count", async () => {
      // Create users and messages
      const sender = await User.createUser(senderData);

      const receiver = await User.createUser(receiverData);

      const chat = await Chat.createChat({
        type: "private",
        participants: [sender._id ,  sender._id ],
      });

      // Create some unread messages
   const addmess1= await Message.addMessage( {
        chatId: chat._id,
        sender:sender._id,
        receiver: receiver._id,
        content: "Unread 1",
        contentType: "text",
      })
      const addMes2=await Message.addMessage( {
        chatId: chat._id,
        sender:sender._id,
        receiver: receiver._id,
        content: "Unread 3",
        contentType: "text",
      })
  //  const [msg1,msg2]=   await Promise.all([addmess1,addMes2])
  // const message2=await Message.findOne({_id:msg2.message._id})

      // Get unread count
      const unreadCount = await Message.getUnreadCount(receiver._id.toString());

      // Assertion
      expect(unreadCount).toBe(2);
      expect(sender.username).toBe("sender");
      expect(receiver.username).toBe("receiver");
      expect(chat.type).toBe("private");
      expect(addmess1.message.content).toBe("Unread 1");
      expect(addMes2.message.content).toBe("Unread 3");
    });
  });
});
