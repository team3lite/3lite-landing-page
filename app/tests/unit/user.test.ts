import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { User, Users } from "../../lib/db/models/user";

export type IuserData = {
  status?: "online" | "offline";
  lastSeen?: Date;
  walletType: string;
  username: string;
  connectionTimestamp: Date;
  walletAddress: string;
};

describe("Mongoose User Model Tests", () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    // Create an in-memory MongoDB server
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    // Connect Mongoose to the in-memory database
    await mongoose.connect(mongoUri);
  });

  afterAll(async () => {
    // Disconnect and stop the in-memory server after tests
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    // Clear all collections before each test
    await User.deleteMany({});
  });

  describe("User Creation", () => {
    it("should create a user with valid data", async () => {
      const userData: IuserData = {
        status: "online",
        lastSeen: new Date(),
        connectionTimestamp: new Date(),
        walletAddress: "0x1234567890abcdef",
        walletType: "metamask",
        username: "testuser",
      };

      const user = await User.createUser(userData);
      
      expect(user).toBeDefined();
      expect(user.walletAddress).toBe(userData.walletAddress);
      expect(user.username).toBe(userData.username);
      expect(user.walletType).toBe(userData.walletType);
      expect(user.status).toBe("online");
    });

    it("should update connection timestamp for existing user", async () => {
      const userData: IuserData = {
        username: "testuser",
        connectionTimestamp: new Date(2023, 1, 1),
        walletAddress: "0x1234567890abcdef",
        walletType: "metamask",
      };

      // First create user
      const initialUser = await User.createUser(userData);
      
      // Create again with new connection timestamp
      const updatedUserData = {
        ...userData,
        connectionTimestamp: new Date(2023, 2, 2)
      };
      const updatedUser = await User.createUser(updatedUserData);

      expect(updatedUser._id).toEqual(initialUser._id);
      expect(updatedUser.connectionTimestamp).toEqual(updatedUserData.connectionTimestamp);
    });

    it("should prevent duplicate username with different wallet", async () => {
      const userData: IuserData = {
        username: "testuser",
        connectionTimestamp: new Date(),
        walletAddress: "0x1234567890abcdef",
        walletType: "metamask",
      };

      await User.createUser(userData);

      await expect(
        User.createUser({
          ...userData,
          walletAddress: "0xDIFFERENTWALLET"
        })
      ).rejects.toThrow("Username already exists");
    });
  });

  describe("Login Validation", () => {
    it("should validate correct login credentials", async () => {
      const userData: IuserData = {
        username: "testuser",
        connectionTimestamp: new Date(),
        walletAddress: "0x1234567890abcdef",
        walletType: "metamask",
      };

      await User.createUser(userData);

      const loggedInUser = await User.validateLogin({
        username: userData.username,
        walletAddress: userData.walletAddress,
      });

      expect(loggedInUser).toBeDefined();
      expect(loggedInUser.walletAddress).toBe(userData.walletAddress);
      expect(loggedInUser.username).toBe(userData.username);
    });

    it("should reject invalid login credentials", async () => {
      const userData: IuserData = {
        username: "testuser",
        connectionTimestamp: new Date(),
        walletAddress: "0x1234567890abcdef",
        walletType: "metamask",
      };

      await User.createUser(userData);

      await expect(
        User.validateLogin({
          username: userData.username,
          walletAddress: "wrongaddress",
        })
      ).rejects.toThrow("Invalid credentials");

      await expect(
        User.validateLogin({
          username: "wrongusername",
          walletAddress: userData.walletAddress,
        })
      ).rejects.toThrow("Invalid credentials");
    });
  });

  describe("User Search", () => {
    it("should find users by regex", async () => {
      const users: IuserData[] = [
        {
          username: "codedtim",
          connectionTimestamp: new Date(),
          walletAddress: "0x1234567890abcdef",
          walletType: "metamask",
        },
        {
          username: "timcodes",
          connectionTimestamp: new Date(),
          walletAddress: "0x1dd234567890abcdef",
          walletType: "solflare",
        },
        {
          username: "testuser1",
          connectionTimestamp: new Date(),
          walletAddress: "0x0dsx1234567890abcdef",
          walletType: "metamask",
        },
      ];

      await User.create(users);

      const foundUsers = await User.getUsersFromRegex({ regex: "tim" });
      
      expect(foundUsers.length).toBe(2);
      expect(foundUsers.some((u) => u.username === "timcodes")).toBe(true);
      expect(foundUsers.some((u) => u.username === "codedtim")).toBe(true);
    });
  });

  describe("Find By Wallet and Username", () => {
    it("should find user by wallet address and username", async () => {
      const userData: IuserData = {
        username: "testuser",
        connectionTimestamp: new Date(),
        walletAddress: "0x1234567890abcdef",
        walletType: "metamask",
      };

      await User.createUser(userData);

      const foundUser = await User.findByWalletAddressAndUsername({
        walletAddress: userData.walletAddress,
        username: userData.username,
      });

      expect(foundUser).toBeDefined();
      expect(foundUser.walletAddress).toBe(userData.walletAddress);
      expect(foundUser.username).toBe(userData.username);
    });

    it("should throw error if wallet does not exist", async () => {
      await expect(
        User.findByWalletAddressAndUsername({
          walletAddress: "nonexistent",
          username: "testuser",
        })
      ).rejects.toThrow("wallet does not exist");
    });

    it("should throw error if username does not match", async () => {
      const userData: IuserData = {
        username: "testuser",
        connectionTimestamp: new Date(),
        walletAddress: "0x1234567890abcdef",
        walletType: "metamask",
      };

      await User.createUser(userData);

      await expect(
        User.findByWalletAddressAndUsername({
          walletAddress: userData.walletAddress,
          username: "differentusername",
        })
      ).rejects.toThrow("Username does not match");
    });
  });
});