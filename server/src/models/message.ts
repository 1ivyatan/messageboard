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
  },
  votes: {
    type: Number,
    default: 0
  }
});

export const messageModel = mongoose.model("Message", messageSchema);