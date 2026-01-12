import express from "express";
import * as messagesController from "../../controllers/messagesController";

const messages = express.Router();

messages.get("/", messagesController.get);
messages.post("/", messagesController.post);

export default messages;