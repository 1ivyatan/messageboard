import { Types } from "mongoose";
import { voteModel } from "../models/vote";

export async function get(req: any, res: any): Promise<void> {
  res.json({test: req.params.id});
  res.end();
}

export async function create(req: any, res: any): Promise<void> {
  const { type } = req.body ?? {};

  let num: Number = 0;

  switch (type) {
    case "up":
      num = 1;
      break;

    case "down":
      num = -1;
      break;

    default:
      break;
  }

  const message = Types.ObjectId.createFromHexString(req.params.id);

  const vote = new voteModel({
    message: message,
    ip: req.ip,
    num: num,
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