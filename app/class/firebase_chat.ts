import { IMessage } from "../lib/db/models/message";
import {
  database,
  ref,
  set,
  onValue,
  push,
  remove,
  update,
} from "../lib/db/firebase";
import { IChat } from "../lib/db/models/chat";
import { ItestChat, ItestMessage } from "@/tests/unit/firebase.test";
import mongoose from "mongoose";

export class FirebaseChat {
  static async syncMessage(message: Partial<ItestMessage>) {


    const sanitizedMessage = {
      _id: message._id.toString(),
      chat: message.chat.toString(),
      sender: message.sender.toString(),
      receiver: message.receiver.toString(),
      content: message.content,
      contentType: message.contentType,
      timestamp: message.timestamp,
      deliveryStatus: message.deliveryStatus,
    } 


    const chatRef = ref(
      database,
      `chats/${message.chat}/messages/${message._id.toString()}`
    );
    await set(chatRef, {
      ...sanitizedMessage,
      timestamp: message.timestamp.getTime(), // Convert Date to timestamp for Firebase
    });
  }

  static async syncChat(chat: ItestChat) {
    console.log({chat: `chats/${chat._id.toString()}/info`})
    const chatRef = ref(database, `chats/${chat._id.toString()}/info`);
    //consrvert object ids to strings
    const sanitizedChats={
      type: chat.type.toString(),
      contractAddress: chat.contractAddress ? chat.contractAddress.toString() : null,
      _id: chat._id.toString(),
      messages: chat.messages.map((m) => m.toString()), 
      lastMessage: chat.lastMessage ? chat.lastMessage.toString() : null,
      participants: chat.participants.map((p) => p.toString()),
    }
    await set(chatRef, {
      ...sanitizedChats,
      createdAt: chat.createdAt.getTime(),
      updatedAt: chat.updatedAt.getTime(),
      lastMessage: sanitizedChats.lastMessage ? chat.lastMessage : null,
    });
  }

  static subscribeToChat(
    chatId: string,
    callback: (messages: ItestMessage[]) => void
  ) {
    const chatRef = ref(database, `chats/${chatId.toString()}/messages`);
    return onValue(chatRef, (snapshot) => {
      const messages: ItestMessage[] = [];
      snapshot.forEach((childSnapshot) => {
        const message = childSnapshot.val();
        messages.push({
          ...message,
          timestamp: new Date(message.timestamp),
        });
      });
      callback(
        messages.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
      );
    });
  }

  static subscribeToUserChats(
    userId: string,
    callback: (chats: ItestChat[]) => void
  ) {
    const userChatsRef = ref(database, "chats");
    return onValue(userChatsRef, (snapshot) => {
      const chats: ItestChat[] = [];
      snapshot.forEach((childSnapshot) => {
        const chat = childSnapshot.child("info").val();

        if (chat && chat.participants.some((p: any) => p.toString() === userId.toString())) {
          chats.push({
            ...chat,
            createdAt: new Date(chat.createdAt),
            updatedAt: new Date(chat.updatedAt),
            lastMessage: chat.lastMessage
              ? {
                  ...chat.lastMessage,
                  timestamp: new Date(chat.lastMessage.timestamp),
                }
              : undefined,
          });
        } else {
        }
      });
      callback(
        chats.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
      );
    });
  }
  static async deleteMessage(chatId: string, messageId: string) {
    const messageRef = ref(database, `chats/${chatId}/messages/${messageId}`);
    await remove(messageRef);
  }
  static async deleteAllMessages(){
    await set(ref(database), null);
  }

  static async editMessage(
    chatId: string,
    messageId: string,
    newContent: string
  ) {
    const messageRef = ref(database, `chats/${chatId}/messages/${messageId}`);
    await update(messageRef, {
      content: newContent,
      edited: true,
      editedAt: new Date().getTime(),
    });
  }

  static subscribeToTyping(chatId: string, callback: (typing: any[]) => void) {
    const typingRef = ref(database, `typing/${chatId}`);
    return onValue(typingRef, (snapshot) => {
      const typing: any[] = [];
      snapshot.forEach((childSnapshot) => {
        typing.push({
          userId: childSnapshot.key,
          ...childSnapshot.val(),
        });
      });
      callback(typing);
    });
  }

  static subscribeToPresence(
    userIds: string[],
    callback: (presence: Record<string, any>) => void
  ) {
    const presenceRef = ref(database, "presence");
    return onValue(presenceRef, (snapshot) => {
      const presence: Record<string, any> = {};
      userIds.forEach((userId) => {
        const userPresence = snapshot.child(userId.toString()).val();
        presence[userId.toString()] = userPresence || { status: "offline" };
      });
      callback(presence);
    });
  }
}
