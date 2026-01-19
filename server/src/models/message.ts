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

messageSchema.index(
  {
  _id: -1
  }
);

export const messageModel = mongoose.model("Message", messageSchema);