import express from "express";
import messages from "./api/messages/messages";
import vote from "./api/messages/vote";
import * as messagesSignaller from "../controllers/messagesSignaller";

const api = express.Router();

api.use("/messages", messages);
api.use("/messages/:id/vote", vote);
api.get("/messages/listen", messagesSignaller.get);

//api.get("/health", (_req, res) => {
//  res.json({ ok: true, timestamp: new Date().toISOString(), h: _req.ip  });
//});

//api.post("/echo", (req, res) => {
//  const { message } = req.body ?? {};
//  res.json({ message: message ?? "Nothing received" });
//});

export default api;
