"use server";
import { UserModel, User, Users } from "../models/user";
import dbConnect from "../dbConnect";
export const createUserWithGoogle = async function (
  profile: Partial<{
    id: string;
    email: string;
    name: string;
  }>
) {
  // Create new user with Google auth
  await dbConnect();
  // Check if user already exists
  const user = await (User as UserModel).findOne({
    email: profile.email,
  });
  if (user) {
    //user already exists
    throw new Error("User already exists");
  }
  await (User as UserModel).create({
    googleId: profile.id,
    email: profile.email,
    username: profile.name.replace(/\s+/g, "").toLowerCase(),
    authType: "google",
    credentials: true,
  });
};
export const createUserWithEmail = async function (data: Partial<Users>) {
  const { email, username, password } = data;
  // Validate required fields
  if (!email || !username) {
    throw new Error("Please provide all required fields");
  }
  // Create new user with Google auth
  await dbConnect();
  // Check if email or username already exists
  const existingUser = await (User as UserModel).findOne({
    $or: [{ email }, { username }],
  });

  if (existingUser) {
    throw new Error(
      existingUser.email === email
        ? "Email already exists"
        : "Username already exists"
    );
  }
  //
  await (User as UserModel).create({
    ...data,
    authType: "local",
    credentials: true,
  });
  return "User created successfully";
};

export const loginWithEmail = async function (data: {
  email: string;
  password: string;
}) {
  const { email, password } = data;
  if (!email || !password) {
    throw new Error("Please provide all required fields");
  }
  // Create new user with Google auth
  await dbConnect();
  const user = await (User as UserModel).validateLogin({
    email,
    password,
  });
  console.log("Email fsd", email);
  if (!user) {
    throw new Error("User not found");
  }
  console.log("User found", user);

  return "success";
};
export const loginWithGoogle = async function (data: {
  id: string;
  email: string;
  name: string;
}): Promise<string> {
  const { id, email, name } = data;
  if (!id || !email || !name) {
    throw new Error("Please provide all required fields");
  }
  // Create new user with Google auth
  await dbConnect();
  // Check if user already exists compare email and googleId
  let user = await (User as UserModel).findOne({
    $and: [{ email }, { googleId: id }],
  });
  //if no user found create new user
  console.log({ user });

  if (!user) {
    //check if user with email exists
    user = await (User as UserModel).findOne({ email });
    if (!user) {
      //user already exists
      throw new Error("User not found");
    }
    user = await (User as UserModel).findByIdAndUpdate(user._id, {
      googleId: id,
      authType: "both",
    });
  }
  return "User logeg in successfully";
};
