import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  set,
  remove,
  update,
  onValue,
  off,
} from "firebase/database";
import { FirebaseChat } from "../../class/firebase_chat"; // Your FirebaseChat class
import { IMessage } from "../../lib/db/models/message";
import { Chat, IChat } from "../../lib/db/models/chat";
import mongoose from "mongoose";
import { app, database as testDatabase } from "../../lib/db/firebase";
// Firebase test configuration (use a separate test project)
export type ItestMessage = {
  _id: string;
  content: string;
  contentType: string;
  deliveryStatus: string;
  sender: string;
  receiver: string;
  chat: string;
  timestamp: Date;
};
export type ItestChat = {
  _id: string;
  participants: string[];
  createdAt: Date;
  updatedAt: Date;
  type: string;
  messages: string[];
  contractAddress?: string;
  lastMessage: string;
};
const firebaseTestConfig = {
  apiKey: process.env.FIREBASE_TEST_API_KEY,
  authDomain: process.env.FIREBASE_TEST_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_TEST_DATABASE_URL,
  projectId: process.env.FIREBASE_TEST_PROJECT_ID,
};

describe("FirebaseChat Integration Tests", () => {
  // Unique test identifier to prevent test data collision
  const testRunId = new mongoose.Types.ObjectId(Date.now());

  beforeAll(async () => {
    // Initialize Firebase app for testing
    // testApp = initializeApp(firebaseTestConfig, 'TestApp');
    //empty the database
    await set(ref(testDatabase), null);
  });

  afterAll(async () => {
    // Clean up and remove the test app
  });

  describe("Message Synchronization", () => {
    it("should successfully sync a message", async () => {
      const testMessage: ItestMessage = {
        _id: new mongoose.Types.ObjectId().toString().toString(),
        content: "Test message content",
        contentType: "text",
        deliveryStatus: "sent",
        sender: new mongoose.Types.ObjectId().toString(),
        receiver: new mongoose.Types.ObjectId().toString(),
        chat: new mongoose.Types.ObjectId().toString(),
        timestamp: new Date(),
      };

      // Sync the message
      await FirebaseChat.syncMessage(testMessage);

      // Retrieve the message to verify
      const messageRef = ref(
        testDatabase,
        `chats/${testMessage.chat}/messages/${testMessage._id}`
      );

      // Use a promise to handle the async onValue
      await new Promise((resolve, reject) => {
        onValue(
          messageRef,
          (snapshot) => {
            const syncedMessage = snapshot.val();

            expect(syncedMessage).toBeTruthy();
            expect(syncedMessage.content).toBe(testMessage.content);
            expect(syncedMessage.timestamp).toBe(
              testMessage.timestamp.getTime()
            );

            resolve(null);
          },
          (error) => {
            reject(error);
          },
          { onlyOnce: true }
        );
      });
    });
  });

  describe("Chat Synchronization", () => {
    it("should successfully sync a chat", async () => {
      const testChat: ItestChat = {
        _id: new mongoose.Types.ObjectId().toString(),
        participants: [
          new mongoose.Types.ObjectId().toString(),
          new mongoose.Types.ObjectId().toString(),
        ],
        createdAt: new Date(),
        messages: [],
        updatedAt: new Date(),
        type: "private",
        lastMessage: new mongoose.Types.ObjectId().toString(),
      };

      // Sync the chat
      await FirebaseChat.syncChat(testChat);

      // Retrieve the chat to verify
      const chatRef = ref(testDatabase, `chats/${testChat._id}/info`);

      // Use a promise to handle the async onValue
      await new Promise((resolve, reject) => {
        onValue(
          chatRef,
          (snapshot) => {
            const syncedChat = snapshot.val();

            expect(syncedChat).toBeTruthy();
            expect(syncedChat.participants.length).toBe(2);
            expect(syncedChat.createdAt).toBe(testChat.createdAt.getTime());

            resolve(null);
          },
          (error) => {
            reject(error);
          },
          { onlyOnce: true }
        );
      });
    });
  });

  describe("Subscription Methods", () => {
    it("should subscribe to chat messages", async () => {
      const chatId = new mongoose.Types.ObjectId().toString();
      const testMessages: ItestMessage[] = [
        {
          _id: new mongoose.Types.ObjectId().toString(),
          content: "First message",
          sender: new mongoose.Types.ObjectId().toString(),
          receiver: new mongoose.Types.ObjectId().toString(),
          chat: chatId,
          timestamp: new Date("2023-01-01"),
          contentType: "text",
          deliveryStatus: "sent",
        },
        {
          _id: new mongoose.Types.ObjectId().toString(),
          content: "Second message",
          sender: new mongoose.Types.ObjectId().toString(),
          receiver: new mongoose.Types.ObjectId().toString(),
          chat: chatId,
          timestamp: new Date("2023-01-02"),
          contentType: "text",
          deliveryStatus: "sent",
        },
      ];

      // First, sync test messages
      await Promise.all(
        testMessages.map((msg) => FirebaseChat.syncMessage(msg))
      );

      // Use a promise to test subscription
      await new Promise((resolve, reject) => {
        const unsubscribe = FirebaseChat.subscribeToChat(chatId, (messages) => {
          try {
            expect(messages.length).toBe(2);
            expect(messages[1].content).toBe("Second message");
            expect(messages[0].content).toBe("First message");

            // Unsubscribe to clean up
            unsubscribe();
            resolve(null);
          } catch (error) {
            reject(error);
          }
        });
      });
    });

    it("should subscribe to user chats", async () => {
      const userId = new mongoose.Types.ObjectId().toString();
      const chat1Id = new mongoose.Types.ObjectId().toString();
      const chat2Id = new mongoose.Types.ObjectId().toString();
      const testChats: ItestChat[] = [
        {
          _id: chat1Id,
          participants: [new mongoose.Types.ObjectId().toString(), userId],
          createdAt: new Date(),
          updatedAt: new Date(),
          messages: [],
          type: "private",
          lastMessage: new mongoose.Types.ObjectId().toString(),
        },
        {
          _id: chat2Id,
          type: "private",
          messages: [],
          participants: [new mongoose.Types.ObjectId().toString(), userId],
          createdAt: new Date(),
          updatedAt: new Date(),
          lastMessage: new mongoose.Types.ObjectId().toString(),
        },
      ];

      // First, sync test chats
      await Promise.all(testChats.map((chat) => FirebaseChat.syncChat(chat)));

      // Use a promise to test subscription
      await new Promise((resolve, reject) => {
        const unsubscribe = FirebaseChat.subscribeToUserChats(
          userId,
          (chats) => {
            try {
              expect(chats.length).toBe(2);
              expect(chats[0]._id.toString()).toBe(chat1Id.toString());
              expect(chats[1]._id.toString()).toBe(chat2Id.toString());

              // Unsubscribe to clean up
              unsubscribe();
              resolve(null);
            } catch (error) {
              reject(error);
            }
          }
        );
      });
    });
  });

  describe("Message Manipulation", () => {
    it("should delete a message", async () => {
      const chatId = new mongoose.Types.ObjectId().toString();
      const messageId = new mongoose.Types.ObjectId().toString();

      // First, create a test message
      const testMessage: ItestMessage = {
        _id: new mongoose.Types.ObjectId().toString(),
        content: "Test message content",
        contentType: "text",
        deliveryStatus: "sent",
        sender: new mongoose.Types.ObjectId().toString(),
        receiver: new mongoose.Types.ObjectId().toString(),
        chat: new mongoose.Types.ObjectId().toString(),
        timestamp: new Date(),
      };

      // Sync the message
      await FirebaseChat.syncMessage(testMessage);

      // Delete the message
      await FirebaseChat.deleteMessage(chatId, messageId);

      // Verify message is deleted
      await new Promise((resolve, reject) => {
        const messageRef = ref(
          testDatabase,
          `chats/${chatId}/messages/${messageId}`
        );

        onValue(
          messageRef,
          (snapshot) => {
            try {
              expect(snapshot.val()).toBeNull();
              resolve(null);
            } catch (error) {
              reject(error);
            }
          },
          { onlyOnce: true }
        );
      });
    });

    it("should edit a message", async () => {
      const chatId = new mongoose.Types.ObjectId().toString();
      const messageId = new mongoose.Types.ObjectId().toString();

      // First, create a test message
      const testMessage: ItestMessage = {
        _id: new mongoose.Types.ObjectId().toString(),
        content: "Test message content",
        contentType: "text",
        deliveryStatus: "sent",
        sender: new mongoose.Types.ObjectId().toString(),
        receiver: new mongoose.Types.ObjectId().toString(),
        chat: new mongoose.Types.ObjectId().toString(),
        timestamp: new Date(),
      };

      // Sync the message
      await FirebaseChat.syncMessage(testMessage);

      // Edit the message
      const newContent = "Edited message content";
      await FirebaseChat.editMessage(chatId, messageId, newContent);

      // Verify message is edited
      await new Promise((resolve, reject) => {
        const messageRef = ref(
          testDatabase,
          `chats/${chatId}/messages/${messageId}`
        );

        onValue(
          messageRef,
          (snapshot) => {
            const editedMessage = snapshot.val();
            try {
              expect(editedMessage.content).toBe(newContent);
              expect(editedMessage.edited).toBe(true);
              expect(editedMessage.editedAt).toBeTruthy();
              resolve(null);
            } catch (error) {
              reject(error);
            }
          },
          { onlyOnce: true }
        );
      });
    });
  });
  describe("Chat Switching", () => {
    it("should switch subscriptions when changing chats with different receivers", async () => {
      const chat1Id = new mongoose.Types.ObjectId();
      const chat2Id = new mongoose.Types.ObjectId();
      const senderId = new mongoose.Types.ObjectId();
      const receiver1Id = new mongoose.Types.ObjectId();
      const receiver2Id = new mongoose.Types.ObjectId();
  
      let chat1Updates = 0;
      let chat2Updates = 0;
  
      // Track messages received for each chat
      const chat1Messages: any[] = [];
      const chat2Messages: any[] = [];
  
      return new Promise<void>(async (resolve) => {
        // Subscribe to first chat (sender -> receiver1)
        const unsubscribe1 = FirebaseChat.subscribeToChat(
          chat1Id.toString(),
          async (messages) => {
            chat1Updates++;
            chat1Messages.length = 0;
            chat1Messages.push(...messages);
  
            if (chat1Updates === 1) {
              // After receiving first chat1 message, create and subscribe to chat2
              const chat2Message: ItestMessage = {
                _id: new mongoose.Types.ObjectId().toString(),
                chat: chat2Id.toString(),
                content: "Hello receiver2",
                sender: senderId.toString(),
                receiver: receiver2Id.toString(), // Different receiver
                contentType: "text",
                deliveryStatus: "sent",
                timestamp: new Date(),
              };
  
              const unsubscribe2 = FirebaseChat.subscribeToChat(
                chat2Id.toString(),
                async (messages) => {
                  chat2Updates++;
                  chat2Messages.length = 0;
                  chat2Messages.push(...messages);
  
                  if (chat2Updates === 1) {
                    // Verify both chats maintain correct messages and receiver associations
                    expect(chat1Messages).toHaveLength(1);
                    expect(chat1Messages[0].content).toBe("Hello receiver1");
                    expect(chat1Messages[0].receiver).toBe(receiver1Id.toString());
                    
                    expect(chat2Messages).toHaveLength(1);
                    expect(chat2Messages[0].content).toBe("Hello receiver2");
                    expect(chat2Messages[0].receiver).toBe(receiver2Id.toString());
  
                    // Send additional messages to both chats to verify independence
                    const additionalChat1Message: ItestMessage = {
                      _id: new mongoose.Types.ObjectId().toString(),
                      chat: chat1Id.toString(),
                      content: "Follow-up to receiver1",
                      sender: senderId.toString(),
                      receiver: receiver1Id.toString(),
                      contentType: "text",
                      deliveryStatus: "sent",
                      timestamp: new Date(),
                    };
  
                    const additionalChat2Message: ItestMessage = {
                      _id: new mongoose.Types.ObjectId().toString(),
                      chat: chat2Id.toString(),
                      content: "Follow-up to receiver2",
                      sender: senderId.toString(),
                      receiver: receiver2Id.toString(),
                      contentType: "text",
                      deliveryStatus: "sent",
                      timestamp: new Date(),
                    };
  
                    await Promise.all([
                      FirebaseChat.syncMessage(additionalChat1Message),
                      FirebaseChat.syncMessage(additionalChat2Message),
                    ]);
  
                    // Wait briefly to ensure messages are processed
                    setTimeout(async () => {
                      // Verify both chats maintained their separate states
                      expect(chat1Messages).toHaveLength(2);
                      expect(chat1Messages.every(m => m.receiver === receiver1Id.toString())).toBe(true);
                      
                      expect(chat2Messages).toHaveLength(2);
                      expect(chat2Messages.every(m => m.receiver === receiver2Id.toString())).toBe(true);
  
                      // Clean up subscriptions
                      await Promise.all([unsubscribe1(), unsubscribe2()]);
                      resolve();
                    }, 500);
                  }
                }
              );
  
              // Send message to chat2 after setting up subscription
              await FirebaseChat.syncMessage(chat2Message);
            }
          }
        );
  
        // Send initial message to chat1 (sender -> receiver1)
        const chat1Message: ItestMessage = {
          _id: new mongoose.Types.ObjectId().toString(),
          chat: chat1Id.toString(),
          content: "Hello receiver1",
          sender: senderId.toString(),
          receiver: receiver1Id.toString(), // First receiver
          contentType: "text",
          deliveryStatus: "sent",
          timestamp: new Date(),
        };
        
        await FirebaseChat.syncMessage(chat1Message);
      });
    });
  });

  it("should handle rapid chat switching without memory leaks", async () => {
    const chatIds = Array.from(
      { length: 5 },
      () => new mongoose.Types.ObjectId()
    );
    const senderId = new mongoose.Types.ObjectId();
    const receiverId = new mongoose.Types.ObjectId();

    const updates: { [key: string]: number } = {};
    const unsubscribes: Array<() => void> = [];

    await new Promise<void>((resolve) => {
      // Subscribe to each chat in quick succession
      chatIds.forEach((chatId) => {
        updates[chatId.toString()] = 0;

        const unsubscribe = FirebaseChat.subscribeToChat(chatId.toString(), () => {
          updates[chatId.toString()]++;
        });

        unsubscribes.push(unsubscribe);
      });

      // Unsubscribe from all previous chats except the last one
      Promise.all(unsubscribes.slice(0, -1).map((unsub) => unsub())).then(
        () => {
          // Create messages in all chats
          Promise.all(
            chatIds.map(async (chatId) =>{
              const testMessage2: ItestMessage = {
                _id: new mongoose.Types.ObjectId().toString(),
                chat: chatId.toString(),
                content: `Message to chat ${chatId}`,
                sender: senderId.toString(),
                receiver: receiverId.toString(),
                contentType: "text",
                deliveryStatus: "sent",
                timestamp: new Date(),
              };
              await FirebaseChat.syncMessage(testMessage2);
            }
              
             
            )
          ).then(() => {
            // Wait a bit to ensure updates are processed
            setTimeout(() => {
              // Only the last chat should receive updates
              chatIds.forEach((chatId, index) => {
                if (index === chatIds.length - 1) {
                  expect(updates[chatId.toString()]).toBe(1);
                } else {
                  expect(updates[chatId.toString()]).toBe(0);
                }
              });

              unsubscribes[unsubscribes.length - 1]();
              resolve()
            }, 500);
          });
        }
      );
    });
  });

  // Additional tests for typing and presence could be added similarly
});
