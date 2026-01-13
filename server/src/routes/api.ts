import express from "express";
import messages from "./api/messages";
import auth from "../middleware/auth";

const api = express.Router();

api.use("/messages", messages);

api.get("/health", (_req, res) => {
  res.json({ ok: true, timestamp: new Date().toISOString(), h: _req.ip  });
});

api.post("/echo", (req, res) => {
  const { message } = req.body ?? {};
  res.json({ message: message ?? "Nothing received" });
});

export default api;