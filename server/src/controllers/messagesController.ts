import express from "express";

export function get(req: any, res: any): void {
  res.json({ ok: true, timestamp: new Date().toISOString() });
}

export function post(req: any, res: any): void {
  const { title, message } = req.body ?? {};

  res.json({
    title: title,
    message: message
  });
}