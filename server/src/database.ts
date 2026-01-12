import mongoose from "mongoose";

export function connect()
{
  const url = `mongodb://${process.env.DB_URL}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

  mongoose.connect(url)
    .then(() => {
      console.log(`Connected to MongoDB server`);
    })
    .catch((error) => {
      console.error(`Error connecting to MongoDB: ${error}`);
    });
}