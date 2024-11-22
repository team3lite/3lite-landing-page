"use server"
import dbConnect from "@/lib/db/dbConnect";
import { Chat } from "@/lib/db/models/chat";
import { Message } from "@/lib/db/models/message";
import { User } from "@/lib/db/models/user";




export const getUsersFromRegex = async (regex: string) => {
    await dbConnect();
    console.log({regex})
     const resp=await User.getUsersFromRegex({ regex });
     console.log({resp})
  return JSON.stringify(resp);
}

export async function createUser({
  username,
  walletAddress,
  walletType,
  connectionTimestamp
}: {
  username: string;
  walletAddress: string;
  walletType: string;
  connectionTimestamp: Date;
}): Promise<string> {
  await dbConnect();
  const user = await User.createUser({
    username,
    walletAddress,
    walletType,
    connectionTimestamp
  });
   type UserDetails = {
    _id:string;
    username: string;
    walletAddress: string;
    avatar?: string;
    walletType: string;
  };

  return JSON.stringify({
    _id:user._id,
    username:user.username,
    walletAddress:user.walletAddress,
    avatar:user.avatar,
    walletType:user.walletType,
  });
}

export const createChat = async ({
  senderId,
  receiverId
}: {
  senderId: string;
  receiverId: string;

}) => {
    await dbConnect();
    const chat = await Chat.createChat({
      type: "private",
      participants: [
        senderId,receiverId
      ]
    });
    console.log({chat},"chat created")
    return JSON.stringify(chat);
}


export const getChats = async (userId: string):Promise<string> => {

  await dbConnect();
  try{

    const chats = await Chat.getChats({userId});
    console.log({chats},"chats")
    return JSON.stringify(chats);
  }
  catch(err){
    console.log({err})
    throw new Error("No chats found");
  }

}

export const getChat = async (userId: string,user2Id:string):Promise<string> => {
  await dbConnect();
  try{
    const chat = await Chat.getChat({userId,user2Id});
    //sort the messages
    console.log({chat})
    return JSON.stringify(chat);
  }
  catch(err){
    console.log({err})
    throw new Error("No chats found");
  }
}

export const getUserIdFromUsername = async (username: string): Promise<string> => {
  await dbConnect();
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error('User not found');
  }
  return user._id.toString();
}

export const getChatMessages=async (chatId:string): Promise<string>=>{
await dbConnect()

const chats= await Message.getMessages({chatId})

console.log("demesa",{chats})

return JSON.stringify(chats)





}

export const addMessage = async ({
  chatId,
  sender,
  receiver,
  message
}: {
  chatId: string|null;
  sender: string;
  receiver:string;
  message: string;
}) => {
  await dbConnect();
  console.log("adding message")
  const resp=await Message.addMessage({
      chatId,
      sender,
      receiver,
      content: message,
      contentType: 'text'
    });
return JSON.stringify(resp)
}


