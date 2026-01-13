import express from "express";
import { messageModel } from "../models/message";

export function get(req: any, res: any): void {
  res.json({ ok: true, timestamp: new Date().toISOString(), h: req.ip });
}

export async function post(req: any, res: any): void {
  const { title, body } = req.body ?? {};
  const clientIp = req.ip;

  const message = new messageModel({
    title: title,
    body: body,
    ip: req.ip,
    date: Date.now()
  });

  try {
    await message.save();
    res.status(200);
    res.json({ message: "Message successfully sent" });
  } catch (e: any)
  {
    console.log(e.message);
    res.status(500);
    res.json({ error: "Message was not sent" });
  }
}