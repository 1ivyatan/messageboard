import { Vote } from "./Vote";

export type Message = {
  _id: String;
  title: String;
  body: String;
  timestamp: String;
  votes: Vote;
};
