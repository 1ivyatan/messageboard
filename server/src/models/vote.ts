import mongoose, { Schema } from 'mongoose';

const voteSchema = new mongoose.Schema({
  message: {
    type: Schema.Types.ObjectId,
    ref: 'Message',
  },
  ip: {
    type: String
  },
  vote: {
    type: String,
    enum: ["up", "down"]
  }
});

voteSchema.index(
  {
    message: 1,
    ip: 1,
  },
  {
    unique: true,
  }
);

export const voteModel = mongoose.model("Vote", voteSchema);