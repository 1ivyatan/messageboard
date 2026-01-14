import { Types } from "mongoose";
import { voteModel } from "../models/vote";

export async function get(req: any, res: any): Promise<void> {

  res.json({test: req.params.id});
  res.end();
}

export async function create(req: any, res: any): Promise<void> {
  const { type } = req.body ?? {};

  const message = Types.ObjectId.createFromHexString(req.params.id);

  const vote = new voteModel({
    message: message,
    ip: req.ip,
    type: type,
  });

  try {
    await vote.save();
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