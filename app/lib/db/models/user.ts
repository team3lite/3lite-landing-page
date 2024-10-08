import bcrypt from "bcrypt";
import mongoose, { Model } from "mongoose";
import validator from "validator";

export interface Users extends Document {
  _id: string;

  email: string;
  username: string;
  password?: string;
  authType: "local" | "google" | "both";
  googleId?: string;
  credentials: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface UserModel extends Model<Users> {
  createUser(data: Partial<Users>): Promise<Users>;
  validateLogin(data: {
    email: string;
    password: string;
  }): Promise<Users | Error>;
  findByEmailAndUsername(data: {
    email: string;
    username: string;
  }): Promise<{ success: boolean } | Error>;
}

// User Schema
const UserSchema = new mongoose.Schema<Users, UserModel>(
  {
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      maxlength: [60, "Email cannot be more than 60 characters"],
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: "Please provide a valid email",
      },
    },
    username: {
      type: String,
      required: [true, "Please provide a username"],
      unique: true,
      maxlength: [20, "Username cannot be more than 20 characters"],
    },
    password: {
      type: String,
      required: [
        function (this: Users) {
          return this.authType === "local";
        },
        "Password is required for local authentication",
      ],
      validate: {
        validator: function (this: Users, value: string) {
          return (
            this.authType === "google" || true
            // uncomment for production
            // validator.isStrongPassword(value, { minSymbols: 0,minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1 })
          );
        },
        message: "Please provide a strong password",
      },
    },
    authType: {
      type: String,
      required: true,
      enum: ["local", "google"],
    },
    googleId: {
      type: String,
      required: [
        function (this: Users) {
          return this.authType === "google";
        },
        "Google ID is required for Google authentication",
      ],
    },
    credentials: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

// Middleware to hash password before saving
UserSchema.pre("save", async function (next) {
  if (this.isModified("password") && this.password) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Static methods
UserSchema.statics.createUser = async function (data: Partial<Users>) {
  const { email, username, password, authType, googleId } = data;

  // Validate required fields
  if (!email || !username || (!password && authType === "local")) {
    throw new Error("Please provide all required fields");
  }

  // Check if email or username already exists
  const existingUser = await this.findOne({
    $or: [{ email }, { username }],
  });

  if (existingUser) {
    throw new Error(
      existingUser.email === email
        ? "Email already exists"
        : "Username already exists"
    );
  }

  return this.create({
    ...data,
    credentials: true,
  });
};

UserSchema.statics.validateLogin = async function (data: {
  email: string;
  password: string;
}) {
  console.log({ data }, "dattt");
  const { email, password } = data;
  if (!email || !password) {
    throw new Error("Please provide all required fields");
  }
  console.log("Email fdgdfgdf", email);

  const user = await this.findOne({
    email,
    // auth type = local or both
    authType: { $in: ["local", "both"] },
  });
  console.log("User found", user);

  if (!user) {
    throw new Error("Invalid credentials hewe");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password!);
  if (!isPasswordValid) {
    throw new Error("Email and password do not match");
  }

  return user;
};

UserSchema.statics.findByEmailAndUsername = async function ({
  email,
  username,
}: {
  email: string;
  username: string;
}) {
  const emailExist = await this.findOne({ email });
  if (!emailExist) {
    return new Error("Email does not exist");
  }

  if (username !== emailExist.username) {
    throw new Error("Username does not match");
  }

  return { success: true };
};

export const User =
  mongoose.models.User || mongoose.model<Users, UserModel>("User", UserSchema);
