import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import asyncHandler from "../utils/asynchandler.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import jwt from "jsonwebtoken"
import {cloudinary} from "../utils/cloudinary.js"

const generateAccessAndRefreshToken = async (userID) => {
  try {
    const user = await User.findById(userID);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Failed to generate refresh Token", error);
  }
};

const registerUser = asyncHandler(async (req, res) => {
  //get all details
  //validate empty
  //validate unique user
  //get the token and profilePic link

  const { username, fullName, email, password} = req.body;
  
  // Check if any required field is missing or empty
  if (!username || !fullName || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }
  
  if (
    [fullName, username, email, password].some((field) => field.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  if (password.length < 8) {
    throw new ApiError(
      400,
      "Password length must be greater than or equal to 8"
    );
  }

  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  });
  if (existingUser) {
    throw new ApiError(400, "User already exists");
  }

  //before saving the password will automatically be encrypted
  const user = await User.create({
    username,
    fullName,
    email,
    password
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(500, "Registering user failed ");
  }
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const options = {
    httpOnly: true, //prevent xss attack
    secure: process.env.NODE_ENV !== "development", //http vs https localhost and production issue fix
  };

  res
    .status(201)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(201, createdUser, "User successfully registered"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  //validating empty check
  if (!(username || email)) {
    throw new ApiError(400, "Username or email is required ");
  }

  //check if user exists with username or email
  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(401, "User not found ");
  }

  //check is password matches the stored database password
  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(400, "Invalid credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true, //prevent xss attack
    secure: process.env.NODE_ENV !== "development", //http vs https localhost and production issue fix
  };

  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, { loggedInUser }, "Login successfull"));
});


const logoutUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $unset: {
        refreshToken: null,
      },
    },
    {
      new: true,
    }
  );
  if (!user) {
    throw new ApiError(400, "Please login first or User not found");
  }

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out "));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies?.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(400, "Refresh token required");
  }

  const decodedTokenInfo = jwt.verify(
    incomingRefreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  if (!decodedTokenInfo) {
    throw new ApiError(401, "Invalid refresh token");
  }

  const user = await User.findById(decodedTokenInfo._id).select("-password");
  if (!user) {
    throw new ApiError(401, "Invalid refresh token");
  }

  if(incomingRefreshToken!==user?.refreshToken){
    throw new ApiError(401,"Refresh Token expired")
  }

  const {newAccessToken,newRefreshToken} = await generateAccessAndRefreshToken(user?._id)

  const options = {
    httpOnly:true,
    secure:process.env.NODE_ENV !== "development",
  }
  return res
    .status(200)
    .cookie("accessToken", newAccessToken, options)
    .cookie("refreshToken", newRefreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          newAccessToken,
          newRefreshToken,
          user,
        },
        "Refresh and Access token successfully renewed",
      ),
    );
});


const updateProfile = asyncHandler(async (req, res) => {
  const { profilePic } = req.body;

  if (!profilePic) {
    throw new ApiError(401, "Profile picture is required");
  }
  let uploadedPicUrl 
  try {
    const uploadedPic = await cloudinary.uploader.upload(profilePic, {
      folder: "user-profiles",  // optional: organizes uploads in Cloudinary
      resource_type: "auto",     // handles base64 or URL (image/video)
    })
    uploadedPicUrl = uploadedPic.secure_url; 
  } catch (error) {
    throw new ApiError(500, "Failed to upload image to Cloudinary");
  }
  console.log(uploadedPicUrl)
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    { profilePic: uploadedPicUrl },
    { new: true }
  ).select("-password -refreshToken");

  if (!user) {
    throw new ApiError(401, "Something went wrong while uploading file");
  }

  res
    .status(200)
    .json(new ApiResponse(200, { user }, "Profile updated successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user?._id);
  if (!user) {
    throw new ApiError(404, "User not found ");
  }
  res
    .status(200)
    .json(new ApiResponse(200, user, "Current user fetched successfully"));
});

export { registerUser, loginUser, logoutUser, updateProfile, getCurrentUser, refreshAccessToken };
