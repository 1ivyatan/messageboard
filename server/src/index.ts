import express from "express";
import cors from "cors";
import path from "node:path";
import dotenv from "dotenv";
import routes from "./routes";
import mongoose from "mongoose";

dotenv.config({ debug: true, path: "../.env" });

const app = express();
const PORT = Number(process.env.SERVER_PORT);

app.use(cors());
app.use(express.json());
app.use(routes);

// Serve static client in production
if (process.env.NODE_ENV === "production") {
  const clientDist = path.resolve(__dirname, "../../client/dist");
  app.use(express.static(clientDist));

  // SPA fallback
  app.get("*", (_req, res) => {
    res.sendFile(path.join(clientDist, "index.html"));
  });
}

mongoose
  .connect(
    `mongodb://${process.env.DB_URL}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  )
  .then(() => {
    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error(`Error connecting to MongoDB: ${error}`);
  });
