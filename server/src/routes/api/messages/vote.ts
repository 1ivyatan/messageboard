import express from "express";
import * as voteController from "../../../controllers/voteController";

const vote = express.Router({ mergeParams: true });

vote.post("/", voteController.create);
vote.get("/", voteController.get);

export default vote;