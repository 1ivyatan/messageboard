import express from "express";
import { PipelineStage, Types } from "mongoose";
import { messageModel } from "../models/message";

const itemCount: number = 10;

export async function index(req: any, res: any): Promise<void> {
  const { firstId, lastId } = req.query;

  const aggregation: any[] = [
    {
      $lookup: {
        from: "votes",
        localField: "_id",
        foreignField: "message",
        as: "votes",
        let: {
          userIp: req.ip,
        },
        pipeline: [
          {
            $group: {
              _id: "$message",
              count: {
                $sum: {
                  $cond: [{ $eq: ["$vote", "up"] }, 1, -1],
                },
              },
              up: {
                $sum: {
                  $cond: [{ $eq: ["$vote", "up"] }, 1, 0],
                },
              },
              down: {
                $sum: {
                  $cond: [{ $eq: ["$vote", "down"] }, 1, 0],
                },
              },
              votes: {
                $push: { ip: "$ip", vote: "$vote" },
              },
            },
          },
          {
            $project: {
              _id: 0,
              count: 1,
              up: 1,
              down: 1,
              clientVote: {
                $let: {
                  vars: {
                    found: {
                      $arrayElemAt: [
                        {
                          $filter: {
                            input: "$votes",
                            cond: { $eq: ["$$this.ip", "$$userIp"] },
                          },
                        },
                        0,
                      ],
                    },
                  },
                  in: "$$found.vote",
                },
              },
            },
          },
        ],
      },
    },
    {
      $addFields: {
        votes: {
          $ifNull: [
            {
              $arrayElemAt: ["$votes", 0],
            },
            {
              count: 0,
              up: 0,
              down: 0,
            },
          ],
        },
      },
    },
    {
      $project: {
        _id: 1,
        title: 1,
        body: 1,
        timestamp: 1,
        votes: 1,
      },
    },
    {
      $sort: {
        _id: -1,
      },
    },
    {
      $limit: itemCount + 1,
    },
  ];

  let prevMessage: any[] = [];

  if (!lastId !== !firstId) {
    const message = Types.ObjectId.createFromHexString(lastId || firstId);

    if (lastId) {
      const matchStage: PipelineStage = {
        $match: {
          _id: {
            $lt: message,
          },
        },
      };

      prevMessage = [
        {
          $match: {
            _id: {
              $gte: message,
            },
          },
        },
        {
          $sort: {
            _id: 1,
          },
        },
        {
          $limit: itemCount,
        },
      ];

      aggregation.unshift(matchStage);
    } else if (firstId) {
      const matchStage: PipelineStage = {
        $match: {
          _id: {
            $lte: message,
          },
        },
      };

      prevMessage = [
        {
          $match: {
            _id: {
              $gt: message,
            },
          },
        },
        {
          $sort: {
            _id: 1,
          },
        },
        {
          $limit: itemCount + 1,
        },
      ];

      aggregation.unshift(matchStage);
    }
  }

  const aggregate = await messageModel.aggregate([
    {
      $facet:
        lastId || firstId
          ? {
              data: aggregation,
              prevCheck: prevMessage,
            }
          : {
              data: aggregation,
            },
    },
    {
      $addFields: {
        data: { $slice: ["$data", 10] },
        meta: {
          next: {
            $cond: [
              { $gt: [{ $size: "$data" }, itemCount] },
              { $arrayElemAt: ["$data._id", itemCount - 1] },
              null,
            ],
          },
          prev: {
            $cond: [
              {
                $and: [
                  { $ne: [{ $type: "$prevCheck" }, "missing"] },
                  { $gt: [{ $size: "$prevCheck" }, 0] },
                ],
              },
              lastId
                ? { $arrayElemAt: ["$prevCheck._id", itemCount - 1] }
                : { $arrayElemAt: ["$prevCheck._id", itemCount - 1] },
              null,
            ],
          },
        },
      },
    },
    {
      $project: {
        meta: 1,
        data: 1,
      },
    },
  ]);

  res.json(aggregate[0]);

  res.end();
}

export async function create(req: any, res: any): Promise<void> {
  const { title, body } = req.body ?? {};

  const messageEntry = new messageModel({
    title: title,
    body: body,
    ip: req.ip,
    timestamp: Date.now(),
    votes: 0,
  });

  try {
    await messageEntry.save();
    res.status(200);
    res.json({ message: "Message successfully sent" });
  } catch (e: any) {
    console.log(e.message);
    res.status(500);
    res.json({ error: "Message was not sent" });
  }

  res.end();
}
