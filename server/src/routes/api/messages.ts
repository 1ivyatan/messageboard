import express from "express";

const messages = express.Router();

messages.get("/", (_req, res) => {
  res.json({ ok: true, timestamp: new Date().toISOString() });
});

messages.post("/", (req, res) => {
  const { title, message } = req.body ?? {};

  res.json({
    title: title,
    message: message
  });
});

export default messages;