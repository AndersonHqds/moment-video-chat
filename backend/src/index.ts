import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import dotenv from "dotenv";

import { tokenRouter } from "./routes/token";
import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";

dotenv.config();

const app = express();
app.use(json());
app.use(tokenRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = () => {
  if (
    !process.env.TWILIO_ACCOUNT_SID ||
    !process.env.TWILIO_API_KEY ||
    !process.env.TWILIO_API_SECRET
  ) {
    throw new Error("Some environment variable is missing");
  }

  app.listen(3000, () => {
    console.log("Listening on port 3000!!!!");
  });
};

start();
