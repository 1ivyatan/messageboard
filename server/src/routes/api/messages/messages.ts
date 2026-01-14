import express from "express";
import rateLimit from "express-rate-limit";
import * as messagesController from "../../../controllers/messagesController";
import vote from "./vote";

const messages = express.Router();

messages.get("/", messagesController.index);

const postLimter = rateLimit({
  windowMs: 10000,
  limit: 1,
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false,
  ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
  message: {
    error: "Too many messages sent in this inverval."
  }
})
messages.post("/", postLimter, messagesController.create);

export default messages;