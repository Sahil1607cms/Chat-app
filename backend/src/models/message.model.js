import mongoose from "mongoose";
import { Schema } from "mongoose";

const messageSchema = new Schema(
  {
    senderID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Message = mongoose.model("Message", messageSchema);
