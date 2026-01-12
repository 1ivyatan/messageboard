import express from "express";

const api = express.Router();

api.get("/messages", (_req, res) => {
  res.json({ ok: true, timestamp: new Date().toISOString() });
});

api.post("/messages", (req, res) => {
  const { title, message } = req.body ?? {};

  res.json({
    title: title,
    message: message
  });
});

api.get("/health", (_req, res) => {
  res.json({ ok: true, timestamp: new Date().toISOString() });
});

api.post("/echo", (req, res) => {
  const { message } = req.body ?? {};
  res.json({ message: message ?? "Nothing received" });
});

export default api;