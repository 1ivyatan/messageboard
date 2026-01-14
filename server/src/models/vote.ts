import mongoose, { Schema } from 'mongoose';

const voteSchema = new mongoose.Schema({
  message: {
    type: Schema.Types.ObjectId,
    ref: 'Message',
  },
  ip: {
    type: String
  },
  num: {
    type: String,
    enum: ["up", "down"]
  }
});

export const voteModel = mongoose.model("Vote", voteSchema);