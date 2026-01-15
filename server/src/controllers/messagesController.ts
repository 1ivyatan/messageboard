import express from "express";
import { messageModel } from "../models/message";

export async function index(req: any, res: any): Promise<void> {
  const aggregate = await messageModel.aggregate([{
    $lookup: { 
      from: "votes",
      localField: "_id",
      foreignField: "message",
      as: "votes", 
      pipeline: [ 
        {
          $group: {
            _id: "$message",
            count: {
              $sum: {
                $cond: [{ $eq: ["$vote", "up"] }, 1, -1]
              }
            },
            up: {
              $sum: {
                $cond: [{ $eq: ["$vote", "up"] }, 1, 0]
              }
            },
            down: {
              $sum: {
                $cond: [{ $eq: ["$vote", "down"] }, 1, 0]
              }	
            }
          }
        },
        {
          $unset: "_id"
        }
      ] 
    } 
  }]); 

  const messages = await messageModel
    .find()
    .select({
      _id: 1,
      title: 1,
      body: 1,
      timestamp: 1,
      votes: 1
    })
    .sort({
      timestamp: -1
    })
    .exec();

  res.json(aggregate);

  res.end();
}

export async function create(req: any, res: any): Promise<void> {
  const { title, body } = req.body ?? {};

  const messageEntry = new messageModel({
    title: title,
    body: body,
    ip: req.ip,
    timestamp: Date.now(),
    votes: 0
  });

  try {
    await messageEntry.save();
    res.status(200);
    res.json({ message: "Message successfully sent" });
  } catch (e: any)
  {
    console.log(e.message);
    res.status(500);
    res.json({ error: "Message was not sent" });
  }

  res.end();
}