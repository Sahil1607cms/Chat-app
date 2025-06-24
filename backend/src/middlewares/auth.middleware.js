import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asynchandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";
//get the access token from cookie or header
//verify it using the secret key (jwt.verify)
//get the user from database using accessToken id 
//send the request as req.user which can be accessed anywhere using this middleware
const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new ApiError(400, "Unauthorized request, access token not valid ");
    }

    const decodedTokenInfo = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!decodedTokenInfo) {
      throw new ApiError(400, "Invalid access token");
    }

    const user = await User.findById(decodedTokenInfo._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(400, "Invalid access token");
    }

    req.user = user;

    next();
  } catch (error) {
    throw new ApiError(400, error?.message || "Invalid access token");
  }
});

export { verifyJWT };
