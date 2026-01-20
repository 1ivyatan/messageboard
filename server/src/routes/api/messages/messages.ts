import express from "express";
import rateLimit from "express-rate-limit";
import { isIPv6 } from "node:net";
import { Address6 } from "ip-address";

import * as messagesController from "../../../controllers/messagesController";

const messages = express.Router();
const ipv6Subnet: number = isNaN(Number(process.env.SERVER_IPV6_SUBNET))
  ? 56
  : Number(process.env.SERVER_IPV6_SUBNET);

const postDelay: number = isNaN(Number(process.env.SERVER_POST_DELAY))
  ? 10
  : Number(process.env.SERVER_POST_DELAY);

messages.get("/", messagesController.index);

const postLimiter = rateLimit({
  windowMs: postDelay * 1000,
  limit: 1,
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false,
  ipv6Subnet: ipv6Subnet, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
  message: {
    error: "Too many messages sent in this inverval.",
  },
});

messages.get("/delay", async (req, res) => {
  const targetIp = req.ip;

  try {
    if (targetIp) {
      let key = "";
      if (isIPv6(targetIp)) {
        /* express-rate-limit's default store turns ipv6 into CIDR format to store keys,
      therefore i had to steal this to get the remaining time :DDDD */
        key += `${new Address6(`${targetIp}/${ipv6Subnet}`).startAddress().correctForm()}/${ipv6Subnet}`;
      } else {
        key += `${targetIp}`;
      }

      const value = await postLimiter.getKey(key);

      if (value && value.resetTime) {
        const remainingTime: number = value.resetTime.getSeconds();
        const nowTime: number = new Date().getSeconds();
        const subtraction: number = remainingTime - nowTime;

        res.json({
          delay: subtraction > 0 ? subtraction : 0,
        });
      } else {
        res.json({
          delay: 0,
        });
      }
    } else {
      res.status(400);
      throw new Error("No ip address from client.");
    }
  } catch (e: any) {
    res.json({
      error: e.message,
    });
  }

  res.end();
});

messages.post("/", postLimiter, messagesController.create);

export default messages;
