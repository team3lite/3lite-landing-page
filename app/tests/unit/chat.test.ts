import mongoose from "mongoose";
import { MongoMemoryReplSet } from "mongodb-memory-server";
// import { User, Users, Chat, IChat, Message, IMessage } from './models'; // Adjust import path
import bcrypt from "bcrypt";
import { User, Users } from "../../lib/db/models/user";
import { Chat } from "../../lib/db/models/chat";
import { IuserData } from "./user.test";

describe("Chat Model", () => {
  let replSet: MongoMemoryReplSet;
  beforeAll(async () => {
    // Create an in-memory MongoDB server
    replSet = await MongoMemoryReplSet.create({
      replSet: { count: 1 }, // Number of members in the replica set
    });
    const uri = replSet.getUri(); // Get the connection URI for the replica set

    // Connect Mongoose with replica set support
    await mongoose.connect(uri);
  });

  afterAll(async () => {
    // Disconnect and stop the in-memory server after tests

    await mongoose.disconnect();
    await replSet.stop();
  });

  let user1: Users, user2: Users, user3: Users;

  beforeEach(async () => {
    // Clear all collections before each test
    await User.deleteMany({});
    await Chat.deleteMany({});
    // await Message.deleteMany({});
    user1 = await User.createUser({
      email: "user1@test.com",
      username: "user1",
      password: "Pass123!",
      authType: "local",
      status: "online",
      lastSeen: new Date(),
      credentials: true,
    });

    user2 = await User.createUser({
      email: "user2@test.com",
      username: "user2",
      password: "Pass456!",
      authType: "local",
      status: "online",
      lastSeen: new Date(),
      credentials: true,
    });
    user3 = await User.createUser({
      email: "user3@test.com",
      username: "user3",
      password: "Pass789!",
      authType: "local",
      status: "online",
      lastSeen: new Date(),
      credentials: true,
    });
  });

  describe("Chat Creation", () => {
    it("should create a private chat between two users", async () => {
      const chat = await Chat.createChat({
        type: "private",
        participants: [user1._id, user2._id],
      });

      expect(chat).toBeDefined();
      expect(chat.type).toBe("private");
      expect(chat.participants.length).toBe(2);

      // Check users have been updated with chat reference
      const updatedUser1 = await User.findById(user1._id);
      const updatedUser2 = await User.findById(user2._id);

      expect(updatedUser1?.chats).toContainEqual(chat._id);
      expect(updatedUser2?.chats).toContainEqual(chat._id);
    });

    it("should prevent duplicate private chats", async () => {
      const chat1 = await Chat.createChat({
        type: "private",
        participants: [user1._id, user2._id],
      });

      const chat2 = await Chat.createChat({
        type: "private",
        participants: [user1._id, user2._id],
      });

      expect(chat1._id.toString()).toBe(chat2._id.toString());
    });

    it("should allow multiple group chats", async () => {
      const groupChat1 = await Chat.createChat({
        type: "group",
        participants: [user1._id, user2._id, user3._id],
      });

      const groupChat2 = await Chat.createChat({
        type: "group",
        participants: [user1._id, user2._id, user3._id],
      });

      expect(groupChat1._id.toString()).not.toBe(groupChat2._id.toString());
    });
  });

  describe("Chat Retrieval", () => {
    it("should retrieve chats for a user", async () => {
      const chat1 = await Chat.createChat({
        type: "private",
        participants: [user1._id, user2._id],
      });

      const chat2 = await Chat.createChat({
        type: "private",
        participants: [user1._id, user3._id],
      });

      const userChats = await Chat.getChats({ userId: user1._id });
      // console.log(userChats[0].participants);

      expect(userChats.length).toBe(2);
      expect(
        userChats.some((c) => c._id.toString() === chat1._id.toString())
      ).toBe(true);
      expect(
        userChats.some((c) => c._id.toString() === chat2._id.toString())
      ).toBe(true);
    });

    describe("Chat Retrieval", () => {
      it("should retrieve chats for a user", async () => {
        const chat1 = await Chat.createChat({
          type: "private",
          participants: [user1._id, user2._id],
        });

        const chat2 = await Chat.createChat({
          type: "private",
          participants: [user1._id, user3._id],
        });

        const userChats = await Chat.getChats({ userId: user1._id });

        expect(userChats.length).toBe(2);
        expect(
          userChats.some((c) => c._id.toString() === chat1._id.toString())
        ).toBe(true);
        expect(
          userChats.some((c) => c._id.toString() === chat2._id.toString())
        ).toBe(true);
      });

      it("should retrieve a specific private chat between two users", async () => {
        const chat = await Chat.createChat({
          type: "private",
          participants: [user1._id, user2._id],
        });

        const retrievedChat = await Chat.getChat({
          userId: user1._id,
          user2Id: user2._id,
        });
        console.log({retrievedChat})

        expect(retrievedChat).toBeDefined();
        expect(retrievedChat._id.toString()).toBe(chat._id.toString());
        expect(retrievedChat.participants.length).toBe(2);
        expect(
          retrievedChat.participants.some(
            //@ts-ignore
            (p) => p.username.toString() === user1.username.toString()
          )
        ).toBe(true);
        expect(
          retrievedChat.participants.some(
              //@ts-ignore
            (p) => p.username.toString() === user2.username.toString()
          )
        ).toBe(true);
      });

      it("should return an empty array if no private chat exists between two users", async () => {
        const retrievedChat = await Chat.getChat({
          userId: user1._id,
          user2Id: user3._id,
        });

        expect(retrievedChat).toBeDefined();
      });
    });
  });
});
