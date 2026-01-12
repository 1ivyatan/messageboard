import express from "express";
import api from "./routes/api";

const routes = express.Router();
routes.use("/api", api);

export default routes;