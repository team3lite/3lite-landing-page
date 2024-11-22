import mongoose from "mongoose";
import { MongoChat } from "../../class/mongoose_chat";
import { MongoMemoryReplSet } from "mongodb-memory-server";
import { Message } from "../../lib/db/models/message";
import { Chat } from "../../lib/db/models/chat";

describe("MongoChat Integration Tests", () => {
  let replSet: MongoMemoryReplSet | null = null;
  beforeAll(async () => {
    // Start in-memory MongoDB instance
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
    if (replSet) {
      await replSet.stop();
    }
  });

  beforeEach(async () => {
    // Clear collections before each test
    // const isPrimary = await mongoose.connection.db.admin().command({ isMaster: 1 });
    // if (!isPrimary.ismaster) {
    //   throw new Error("Not connected to the primary node");
    // }
    await Message.deleteMany({});
    await Chat.deleteMany({});
  });

  describe("Message Operations", () => {
    it("should subscribe to chat messages and receive updates in real-time", async () => {
      const chatId = new mongoose.Types.ObjectId();
      const senderId = new mongoose.Types.ObjectId();
      const receiverId = new mongoose.Types.ObjectId();

      let messageCount = 0;
      // Create initial message
      await Message.create({
        chat: chatId,
        content: "Hello",
        sender: senderId,
        receiver: receiverId,
        contentType: "text",
        deliveryStatus: "sent",
        timestamp: new Date(),
      });
      return new Promise<void>((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error("Test timeout - callback not called"));
        }, 10000);
        const unsubscribe = MongoChat.subscribeToChat(
          chatId.toString(),
          async (messages) => {
            try {
              messageCount++;
              //   console.log(`Update ${messageCount}:`, messages);

              if (messageCount === 1) {
                // First update - initial message
                expect(messages).toHaveLength(1);
                expect(messages[0].content).toBe("Hello");

                // Create second message
                await Message.create({
                  chat: chatId,
                  content: "How are you?",
                  sender: senderId,
                  receiver: receiverId,
                  contentType: "text",
                  deliveryStatus: "sent",
                  timestamp: new Date(),
                });
              }

              if (messageCount === 2) {
                // Second update
                expect(messages).toHaveLength(2);
                expect(messages[0].content).toBe("How are you?");
                clearTimeout(timeout);
                (await unsubscribe)();
                resolve();
              }
            } catch (error) {
              clearTimeout(timeout);
              reject(error);
            }
          }
        );
      });
    });
    it("should edit message and notify subscribers", async () => {
      const chatId = new mongoose.Types.ObjectId();
      const messageId = new mongoose.Types.ObjectId();

      let updateCount = 0;
      await Message.create({
        _id: messageId,
        chat: chatId,
        content: "Original content",
        sender: new mongoose.Types.ObjectId(),
        receiver: new mongoose.Types.ObjectId(),
        contentType: "text",
        deliveryStatus: "sent",
        timestamp: new Date(),
      });

      return new Promise<void>((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error("Test timeout - callback not called"));
        }, 10000);

        const unsubscribe = MongoChat.subscribeToChat(
          chatId.toString(),
          async (messages) => {
            try {
              updateCount++;
              console.log(`Update ${updateCount}:`, messages);

              if (updateCount === 1) {
                // First update - initial message
                expect(messages).toHaveLength(1);
                expect(messages[0].content).toBe("Original content");
                MongoChat.editMessage(
                  chatId.toString(),
                  messageId.toString(),
                  "Updated content"
                );
              }

              if (updateCount === 2) {
                // Verify updated message
                expect(messages).toHaveLength(1);
                expect(messages[0].content).toBe("Updated content");

                clearTimeout(timeout);
                (await unsubscribe)();
                resolve();
              }
            } catch (error) {
              clearTimeout(timeout);
              reject(error);
            }
          }
        );
      });
    }, 15000);

    it("should delete message and notify subscribers", async () => {
      const chatId = new mongoose.Types.ObjectId();
      const messageId = new mongoose.Types.ObjectId();
      const senderId = new mongoose.Types.ObjectId();
      const receiverId = new mongoose.Types.ObjectId();

      let updateCount = 0;
      await Message.create({
        _id: messageId,
        chat: chatId,
        content: "Test message",
        sender: new mongoose.Types.ObjectId(),
        receiver: new mongoose.Types.ObjectId(),
        contentType: "text",
        deliveryStatus: "sent",
        timestamp: new Date(),
      });
      return new Promise<void>((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error("Test timeout - callback not called"));
        }, 10000);
        const unsubscribe = MongoChat.subscribeToChat(
          chatId.toString(),
          async (messages) => {
            try {
              updateCount++;
              console.log(`Update ${updateCount}:`, messages);

              if (updateCount === 1) {
                // Initial message
                expect(messages).toHaveLength(1);
                // Delete the message
                MongoChat.deleteMessage(
                  chatId.toString(),
                  messageId.toString()
                );
              }

              if (updateCount === 2) {
                // After deletion
                expect(messages).toHaveLength(0);
                clearTimeout(timeout);
                (await unsubscribe)();
                resolve();
              }
            } catch (error) {
              clearTimeout(timeout);
              reject(error);
            }
          }
        );

        // Create test message
      });
    });
  });

  describe("Chat Operations", () => {
    it("should subscribe to user chats and receive updates in real-time", async () => {
      const userId = new mongoose.Types.ObjectId();
      let updateCount = 0;

      return new Promise<void>((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error("Test timeout - callback not called"));
        }, 10000);
        const unsubscribe = MongoChat.subscribeToUserChats(
          userId.toString(),
          async (chats) => {
            try {
              updateCount++;
              console.log(`Update ${updateCount}:`, chats);

              if (updateCount === 1) {
                // Initial state - no chats
                expect(chats).toHaveLength(0);

                // Create a chat
                Chat.create({
                  participants: [userId, new mongoose.Types.ObjectId()],
                  createdAt: new Date(),
                  type: "private",

                  updatedAt: new Date(),
                });
              }

              if (updateCount === 2) {
                // After chat creation
                const participantIds = chats[0].participants.map((i) =>
                  i.toString()
                );
                expect(chats).toHaveLength(1);
                expect(participantIds).toContain(userId.toString());
                clearTimeout(timeout);
                (await unsubscribe)();
                resolve();
              }
            } catch (error) {
              clearTimeout(timeout);
              reject(error);
            }
          }
        );
      });
    });

    it("should order chats by last message timestamp", async () => {
      const userId = new mongoose.Types.ObjectId();
      const chat1Id = new mongoose.Types.ObjectId();
      const chat2Id = new mongoose.Types.ObjectId();

      // Create two chats
      await Chat.create([
        {
          _id: chat1Id,
          participants: [userId, new mongoose.Types.ObjectId()],
          createdAt: new Date(Date.now() - 1000),
          updatedAt: new Date(Date.now() - 1000),
          type: "private",
        },
        {
          _id: chat2Id,
            type: "private",
          participants: [userId, new mongoose.Types.ObjectId()],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);

      return new Promise<void>((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error("Test timeout - callback not called"));
        }, 10000);
        const unsubscribe =MongoChat.subscribeToUserChats(userId.toString(),async (chats) => {
          try {
            expect(chats).toHaveLength(2);
            expect(chats[0]._id.toString()).toEqual(chat2Id.toString());
            expect(chats[1]._id.toString()).toEqual(chat1Id.toString());
            clearTimeout(timeout);   
             (await unsubscribe)();
            resolve();
          } catch (error) {
            clearTimeout(timeout);
            reject(error);
          }
        });
      });
    });
  });

//   describe("Typing Indicators", () => {
//     it("should handle typing indicators", async () => {
//       const chatId = new mongoose.Types.ObjectId();
//       const userId = new mongoose.Types.ObjectId();

//       await new Promise<void>((resolve) => {
//         const unsubscribe = MongoChat.subscribeToTyping(
//           chatId.toString(),
//           (typing) => {
//             expect(typing).toContainEqual({
//               userId: userId.toString(),
//               isTyping: true,
//             });
//             MongoChat.unSubscribeToChat(chatId.toString()).then(() =>
//               resolve()
//             );
//           }
//         );

//         // Simulate typing
//         mongoose.model("TypingIndicator").create({
//           chatId,
//           userId,
//           isTyping: true,
//         });
//       });
//     });
//   });

//   describe("Presence", () => {
//     it("should handle user presence updates", async () => {
//       const userId = new mongoose.Types.ObjectId();

//       await new Promise<void>((resolve) => {
//         const unsubscribe = MongoChat.subscribeToPresence(
//           [userId.toString()],
//           async (presence) => {
//             expect(presence[userId.toString()]).toEqual({
//               status: "online",
//               lastSeen: expect.any(Date),
//             });
//             (await unsubscribe)().then(() => resolve());
//           }
//         );

//         // Update user presence
//         mongoose.model("Presence").create({
//           userId,
//           status: "online",
//           lastSeen: new Date(),
//         });
//       });
//     });
//   });


});
