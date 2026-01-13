import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  ip: {
    type: String
  },
  title: {
    type: String
  },
  message: {
    type: String
  },
  timestamp: {
    type: Date
  }
});

export const messageModel = mongoose.model("Message", messageSchema);