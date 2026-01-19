import { VoteType } from "./VoteType";

export type Vote = {
  count: number;
  up: number;
  down: number;
  clientVote: VoteType | null;
};
