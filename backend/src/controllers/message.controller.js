import express from "express";
import asyncHandler from "../utils/asynchandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Message } from "../models/message.model.js";
import { cloudinary } from "../utils/cloudinary.js";

const getSidebarUsers = asyncHandler(async (req, res) => {
  //show sideusers only when logged in 
  const loggedInUserID = req.user?._id;
  if (!loggedInUserID) {
    throw new ApiError(400, "Login is required");
  }
  //get users apart from loggedin user (for sidebar)
  const filteredUsers = await User.find({ _id: { $ne: loggedInUserID } }).select(
    "-password"
  );
  if (!filteredUsers) {
    throw new ApiError(401, "Users not found");
  }
  //send the filtered users as a json response
    
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { filteredUsers },
        "Sidebar users fetched successfully"
      )
    );
});

const getMessages = asyncHandler(async (req, res) => {
  //get receivers and loggein user(my) id
  const receiverID = req.params.id;
  const myID = req.user?._id;

  if (!receiverID) {
    throw new ApiError(400, "Receiver not found");
  }
  if (!myID) {
    throw new ApiError(400, "Sender not found");
  }

  //fetch all messages stored between the sender and receiver from the database 
  const messages = await Message.find({
    $or: [
      {
        senderID: myID,
        receiverID: receiverID,
      },
      {
        senderID: receiverID,
        receiverID: myID,
      },
    ],
  });
  if (!messages) {
    throw new ApiError(400, "No messages");
  }

  //send the fetched messages as response json 
  res
    .status(200)
    .json(new ApiResponse(200, { messages }, "Messages fetched successfully"));
});

const sendMessages = asyncHandler(async (req, res) => {
  //get sender and receiver user id 
  const { id: receiverID } = req.params;
  const myID = req.user?._id;
  //get image and text from body 
  const { text, image } = req.body;
  if (!receiverID) {
    throw new ApiError(400, "Receiver not found");
  }
  if (!myID) {
    throw new ApiError(400, "Sender not found");
  }

  //upload image on cloudinary and get its url
  let imageURL;
  if (image) {
    const imageCloudinary = await cloudinary.uploader.upload(image);
    if (!imageCloudinary) {
    throw new ApiError(400, "Failed to upload image on cloudinary");
  }
    imageURL=imageCloudinary?.secure_url
  }

  //store the message in database 
  const message = await Message.create({
    senderID,
    receiverID,
    text,
    image: imageURL,
  });
  await message.save()

  //todo : socket io work needs to be doner

  
  res.status(201).json(new ApiResponse(201,{message},"Message stored and sent successfully"))
});
export { getSidebarUsers, getMessages, sendMessages };
