import { Types } from "mongoose";
import { voteModel } from "../models/vote";
import { messageModel } from "../models/message";

/* very efficient */
export async function updateCount(messageId: Types.ObjectId): Promise<void> {
  const upCount = await voteModel.where({'message': messageId, vote: "up"}).countDocuments().exec();
  const downCount = await voteModel.where({'message': messageId, vote: "down"}).countDocuments().exec();
    
  await messageModel.findOneAndUpdate({
    _id: messageId
  }, { votes: ( upCount - downCount ) });
}