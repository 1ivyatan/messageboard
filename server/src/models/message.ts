import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  ip: {
    type: String
  },
  title: {
    type: String
  },
  body: {
    type: String
  },
  timestamp: {
    type: Date
  }
});

export const messageModel = mongoose.model("Message", messageSchema);