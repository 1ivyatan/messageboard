import express from "express";
import * as voteController from "../../../controllers/voteController";

const vote = express.Router();

vote.post("/", voteController.post);
vote.get("/", voteController.get);

export default vote;