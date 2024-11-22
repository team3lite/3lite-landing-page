

import mongoose, { Model } from "mongoose";
import bcrypt from "bcrypt";

export interface Users extends Document {
  _id: string;
  walletAddress: string;
  avatar?: string;
  status: 'online' | 'offline';
  lastSeen: Date;
  username: string;
  connectionTimestamp: Date;
  walletType:string;
  sentMessages: Array<mongoose.Types.ObjectId>;  // Messages sent by user
  receivedMessages: Array<mongoose.Types.ObjectId>;  // Messages received by user
  chats: Array<mongoose.Types.ObjectId>;
  created_at: Date;
  updated_at: Date;
}


export type ModelId = mongoose.Types.ObjectId | string;
// Define shared interfaces for both models
export interface UserReference {
  _id: ModelId;
  username: string;
  walletAddress: string;
  avatar?: string;
}


export interface UserModel extends Model<Users> {
  createUser(data: Partial<Users>): Promise<Users>;
  usernameContains(data:{regex: string}): Promise<Users[] | Error>;
  validateLogin(data: {
    username: string;
    walletAddress: string;
  }): Promise<Users>;
  findByWalletAddressAndUsername(data: {
    walletAddress: string;
    username: string;
  }): Promise<Users>;
  getUsersFromRegex(data: {
    regex: string;
  }): Promise<Users[]>;
}

// User Schema
const UserSchema = new mongoose.Schema<Users, UserModel>(
  {
    username: {
      type: String,
      required: [true, "Please provide a username"],
      unique: true,
      maxlength: [20, "Username cannot be more than 20 characters"],
    },
    connectionTimestamp: {
      type: Date,
      default: Date.now,
      required: true,
    },
    walletType: {
      type: String,
      required: true,
    },

    walletAddress: { 
      type: String, 
       required:  [true, "Please provide a valid wallet "], 
       unique: true
    },
    avatar: String,
    status: { 
      type: String, 
      enum: ['online', 'offline'], 
      default: 'offline' 
    },
    lastSeen: { 
      type: Date, 
      default: Date.now 
    },
    sentMessages: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message'
    }],
    receivedMessages: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message'
    }],
    chats: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chat'
    }]
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);



// Add the static method properly
UserSchema.static('getUsersFromRegex', async function(data: { regex: string }): Promise<Users[]> {
  const { regex } = data;
  try {
    const users = await this.find({
      username: { $regex: regex, $options: 'i' }  // Added case-insensitive option
    }).exec();
    return users;
  } catch (error) {
    console.error("Error in getUsersFromRegex:", error);
    throw error;
  }
});
// Static methods
UserSchema.statics.createUser = async function (data: Partial<Users>) {
  const { walletAddress, username, walletType, connectionTimestamp} = data;

  // Validate required fields
  if (!walletAddress || !username || !walletType || !connectionTimestamp) {
    throw new Error("Please provide all required fields");
  }
  

  //
  const existingUsernameWithDifferentWallet = await this.findOne({
    username,
    walletAddress: { $ne: walletAddress },
  });
  if(existingUsernameWithDifferentWallet) {
    throw new Error("Username already exists");
  }
  //if username and wallet addressexist just update the connection time
  const existingUser = await this.findOne({
    walletAddress,
    username
  });
  if(existingUser) {
    existingUser.connectionTimestamp = connectionTimestamp;
    await existingUser.save();
    return existingUser;
  }


  

  return this.create({
    ...data,
    credentials: true,
  });
};

UserSchema.statics.validateLogin = async function (data: {
  walletAddress: string;
  username: string;
}):Promise<Users> {
  
  console.log({data})
  const { walletAddress, username } = data;
  if (!walletAddress || !username) {
    throw new Error("Please provide all required fields");
  }
  

  const user = await this.findOne({
    walletAddress
  });

  console.log({found:user});
  
  if (!user) {
    throw new Error("Invalid credentials");
  }
  const isValidWallet = walletAddress== user.walletAddress;
  const isValidUsername = username == user.username;
  if(!isValidWallet || !isValidUsername) {
    throw new Error("Invalid credentials");
  }




  return user;
};

UserSchema.statics.findByWalletAddressAndUsername = async function ({
  walletAddress,
  username,
}: {
  walletAddress: string;
  username: string;
}):Promise<Users> {
  const walletExist = await this.findOne({ walletAddress });
  if (!walletExist) {
    throw new Error("walletExist does not exist");
  }

  if (username !== walletExist.username) {
    throw new Error("Username does not match");
  }

  return walletExist;
};

UserSchema.statics.CreateOrUp


export const User =
  (mongoose.models.User<UserModel> ||
  mongoose.model<Users, UserModel>("User", UserSchema)) as UserModel;


