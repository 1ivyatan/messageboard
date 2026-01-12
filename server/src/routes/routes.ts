import express from "express";

const routes = express.Router();

routes.get("/api/health", (_req, res) => {
  res.json({ ok: true, timestamp: new Date().toISOString() });
});

routes.get("/api/hello", (_req, res) => {
  res.json({ ok: true, timestamp: new Date().toISOString() });
});

routes.post("/api/echo", (req, res) => {
  const { message } = req.body ?? {};
  res.json({ message: message ?? "Nothing received" });
});

export default routes;