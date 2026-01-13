import express from "express";
import * as messagesController from "../../controllers/messagesController";
import rateLimit from "express-rate-limit";

const messages = express.Router();

messages.get("/", messagesController.get);

const postLimter = rateLimit({
  windowMs: 10000,
  limit: 1,
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false,
  ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
})
messages.post("/", postLimter, messagesController.post);

export default messages;