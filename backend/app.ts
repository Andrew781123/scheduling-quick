import express from "express";
const app = express();
import connectDatabase from "./database";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

connectDatabase();

app.use(
  cors({
    origin: [process.env.CLIENT_URL!, process.env.CLIENT_URL_WITH_WWW!], // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true
  })
);
app.use(express.json());

import eventRouter from "./routes/events/event";
app.use("/api/events", eventRouter);

import participantRouter from "./routes/participants/participants";
app.use("/api/events", participantRouter);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
