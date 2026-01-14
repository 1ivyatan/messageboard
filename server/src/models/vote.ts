import mongoose, { Schema } from 'mongoose';

const voteSchema = new mongoose.Schema({
  message: {
    type: Schema.Types.ObjectId,
    ref: 'Message',
  },
  ip: {
    type: String,
    unique: true
  },
  num: {
    type: Number,
    enum: [-1, 1]
  }
});

export const voteModel = mongoose.model("Vote", voteSchema);