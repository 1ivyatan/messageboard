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
    upCount: {
      type: Number
    },
    downCount: {
      type: Number
    },
    totalCount: {
      type: Number
    }
  }
});

export const messageModel = mongoose.model("Message", messageSchema);