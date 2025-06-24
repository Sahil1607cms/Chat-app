import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  updateProfile,
  getCurrentUser,
  refreshAccessToken,
} from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);

router.route("/refresh-token").post(refreshAccessToken);
router.route("/update-profile").put(verifyJWT, updateProfile);
router.route("/check").get(verifyJWT, getCurrentUser);
export default router;
