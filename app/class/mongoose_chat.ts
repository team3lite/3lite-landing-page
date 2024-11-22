
import mongoose from "mongoose";
import { IMessage, Message } from "../lib/db/models/message";
import { Chat, IChat } from "../lib/db/models/chat";
import dbConnect from "@/lib/db/dbConnect";

export class MongoChat {
  private static subscriptions = new Map<
    string,
    mongoose.mongo.ChangeStream<any, any>
  >();

  static async subscribeToChat(
    chatId: string,
    callback: (messages: IMessage[]) => void
  ) {
    
    // Close existing subscription if any
    if (this.subscriptions.has(chatId)) {
      await this.subscriptions.get(chatId)?.close();
    }

    const changeStream = Message.watch(
      [
        {
          $match: {
            $or: [
                {
                  // For inserts and updates
                  $and: [
                    { 'fullDocument.chat': new mongoose.Types.ObjectId(chatId) },
                    { 
                      operationType: { 
                        $in: ['insert', 'update', 'replace'] 
                      } 
                    }
                  ]
                },
                {
                  // For deletes
                  $and: [
                    { 
                      'documentKey._id': { 
                        $exists: true 
                      } 
                    },
                    { 
                      operationType: 'delete'
                    }
                  ]
                }
              ]
            }
          }
        ],
      { fullDocument: "updateLookup" }
    );

    // Store the subscription
    this.subscriptions.set(chatId, changeStream);

    // Initial load of messages
    const messages = await Message.find({ chat: chatId })
      .sort({ timestamp: -1 })
      .exec();
    callback(messages);

    // Listen for changes
    changeStream.on("change", async (change) => {
      console.log("Change event received:", change.operationType);

      try {
    let updatedMessages: IMessage[] = [];
        switch (change.operationType) {
          case "insert":
            // For inserts, we can just add the new document to our existing messages
            updatedMessages = await Message.find({ chat: chatId })
              .sort({ timestamp: -1 })
              .exec();
            break;

          case "update":
          case "replace":
            // For updates, the full updated document is available in fullDocument
            updatedMessages = await Message.find({ chat: chatId })
              .sort({ timestamp: -1 })
              .exec();
            break;

          case "delete":
            // For deletes, we need to fetch all messages again
            updatedMessages = await Message.find({ chat: chatId })
              .sort({ timestamp: -1 })
              .exec();
            break;

          default:
            console.log("Unhandled operation type:", change.operationType);
            return;
        }

        callback(updatedMessages);
      } catch (error) {
        console.error("Error processing change event:", error);
      }
    });

    // Handle errors
    changeStream.on("error", (error) => {
      console.error("Change stream error:", error);
      // Optionally implement retry logic here
    });
    // Return unsubscribe function
    return async () => {
        try {
          await changeStream.close();
          this.subscriptions.delete(chatId);
        } catch (error) {
          console.error('Error closing change stream:', error);
        }
      };
  }

  static async subscribeToUserChats(
    userId: string,
    callback: (chats: IChat[]) => void
  ) {
    const changeStream = Chat.watch(
        [
          {
            $match: {
              $or: [
                  {
                    // For inserts and updates
                    $and: [
                      {  "fullDocument.participants":  new mongoose.Types.ObjectId(userId) },
                      { 
                        operationType: { 
                          $in: ['insert', 'update', 'replace'] 
                        } 
                      }
                    ]
                  },
                  {
                    // For deletes
                    $and: [
                      { 
                        'documentKey._id': { 
                          $exists: true 
                        } 
                      },
                      { 
                        operationType: 'delete'
                      }
                    ]
                  }
                ]
              }
            }
          ],
        { fullDocument: "updateLookup" }
      );
 
    

    // Initial load of chats
    const chats = await Chat.find({ participants: userId })
      .sort({ updatedAt: -1 })
      .exec();
    callback(chats);

    // Listen for changes
 
    changeStream.on("change", async (change) => {
        console.log("Change event received:", change.operationType);
  
        try {
      let updatedChats: IChat[] = [];
          switch (change.operationType) {
            case "insert":
              // For inserts, we can just add the new document to our existing messages
               updatedChats = await Chat.find({ participants: userId })
                .sort({ timestamp: -1 })
                .exec();
              break;
  
            case "update":
            case "replace":
              // For updates, the full updated document is available in fullDocument
              updatedChats = await Chat.find({ participants: userId })
                .sort({ timestamp: -1 })
                .exec();
              break;
  
            case "delete":
              // For deletes, we need to fetch all messages again
              updatedChats = await Chat.find({ participants: userId })
                .sort({ timestamp: -1 })
                .exec();
              break;
  
            default:
              console.log("Unhandled operation type:", change.operationType);
              return;
          }
  
          callback(updatedChats);
        } catch (error) {
          console.error("Error processing change Chats event:", error);
        }
      });

    // Return unsubscribe function
    return async () => {
        try {
          await changeStream.close();
          this.subscriptions.delete(userId);
        } catch (error) {
          console.error('Error closing change stream:', error);
        }
      };
  }

  static async unSubscribeToChat(chatId: string) {
    if (this.subscriptions.has(chatId)) {
      await this.subscriptions.get(chatId)?.close();
      this.subscriptions.delete(chatId);
    }
  }
  static async editMessage(
    chatId: string,
    messageId: string,
    newContent: string
  ) {
    const newId = new mongoose.mongo.ObjectId(messageId);
    console.log({ newId });
    const resp = await Message.findByIdAndUpdate(
      newId,
      {
        $set: {
          content: newContent,
          edited: true,
          editedAt: new Date(),
        },
      },
      {
        new: true,
      }
    );
    console.log({ resp });
  }

  static async deleteMessage(chatId: string, messageId: string) {

    const newId = new mongoose.mongo.ObjectId(messageId);
    await Message.findByIdAndDelete(newId);
  }

  // Optional: Add typing indicators using a separate collection
  static async subscribeToTyping(
    chatId: string,
    callback: (typing: any[]) => void
  ) {
    const TypingIndicator = mongoose.model("TypingIndicator");
    const changeStream = TypingIndicator.watch([
      {
        $match: {
          "fullDocument.chatId": chatId,
        },
      },
    ]);

    // Initial load
    const typing = await TypingIndicator.find({ chatId }).exec();
    callback(typing);

    // Listen for changes
    changeStream.on("change", async (change) => {
      const updatedTyping = await TypingIndicator.find({ chatId }).exec();
      callback(updatedTyping);
    });

    return async () => {
      await changeStream.close();
    };
  }

  // Optional: Add presence using a separate collection
  static async subscribeToPresence(
    userIds: string[],
    callback: (presence: Record<string, any>) => void
  ) {
    const Presence = mongoose.model("Presence");
    const changeStream = Presence.watch([
      {
        $match: {
          "fullDocument.userId": { $in: userIds },
        },
      },
    ]);

    // Initial load
    const presenceList = await Presence.find({
      userId: { $in: userIds },
    }).exec();
    const presence: Record<string, any> = {};
    presenceList.forEach((p) => {
      presence[p.userId] = { status: p.status, lastSeen: p.lastSeen };
    });
    callback(presence);

    // Listen for changes
    changeStream.on("change", async (change) => {
      const updatedPresenceList = await Presence.find({
        userId: { $in: userIds },
      }).exec();
      const updatedPresence: Record<string, any> = {};
      updatedPresenceList.forEach((p) => {
        updatedPresence[p.userId] = { status: p.status, lastSeen: p.lastSeen };
      });
      callback(updatedPresence);
    });

    return async () => {
      await changeStream.close();
    };
  }
}
