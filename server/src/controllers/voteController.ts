import { Types } from "mongoose";
import { voteModel } from "../models/vote";

export async function show(req: any, res: any): Promise<void> {
  const message = Types.ObjectId.createFromHexString(req.params.id);

  const voteEntry = await voteModel
    .findOne({
      'message': message,
      'ip': req.ip
    })
    .exec();

  res.json(voteEntry);
  res.end();
}

export async function create(req: any, res: any): Promise<void> {
  const { vote } = req.body ?? {};
  const message = Types.ObjectId.createFromHexString(req.params.id);
  const voteEntry = new voteModel({
    message: message,
    ip: req.ip,
    vote: vote,
  });

  try {
    await voteEntry.save();
    res.status(200);
    res.json({ message: "Message was voted" });
  } catch (e: any)
  {
    console.log(e.message);
    res.status(500);
    res.json({ error: "Message was not voted" });
  }

  res.end();
}

export async function update(req: any, res: any): Promise<void> {
  const { vote } = req.body ?? {};
  const message = Types.ObjectId.createFromHexString(req.params.id);
  
  const voteEntry = await voteModel
    .findOneAndUpdate(
      {
        'message': message,
        'ip': req.ip
      },
      {
        vote: vote
      });

  res.json({ message: "Message vote was updated" });
  res.end();
}