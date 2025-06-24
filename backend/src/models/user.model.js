import mongoose from "mongoose";
import { Schema } from "mongoose";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
      unique: true,
      index: true,
    },
    fullName: {
      type: String,
      trim: true,
      required: true,
      index: true,
    },
    email: {
      type: String,
      index: true,
    },
    password: {
      type: String,
      trim: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

//encrypt the password before saving or creating the document using pre hook
userSchema.pre("save", async function (next) {
  //if password is not modified and other fields are updated skip encrypting
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//match password after decrypting it
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//GENERATE ACCESS TOKEN
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    //payload
    {
      _id: this._id,
      username: this.username,
      email: this.email,
    },
    //secret key
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

//GENERATE REFRESH TOKEN
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    //payload
    {
      _id: this._id,
    },
    //secret key
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);
