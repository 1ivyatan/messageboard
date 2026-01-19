import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  ip: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
});

export const messageModel = mongoose.model("Message", messageSchema);
