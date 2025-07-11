import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({limit: "10mb"}));
app.use(express.urlencoded({limit: "10mb", extended: true}));
app.use(express.static("public"));
app.use(cookieParser());

import authRouter from "./src/routes/auth.route.js";
import messageRouter from "./src/routes/message.route.js";

app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({
    success: false,
    message: err.message || "Internal server error",
    error: err.error || null,
  });
});

export default app;
