import express from "express";
const app = express();
import connectDatabase from "./database";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

connectDatabase();

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL, // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
  })
);

import eventRouter from "./routes/events/event";
app.use("/api/events", eventRouter);

import participantRouter from "./routes/participants/participants";
app.use("/api/events", participantRouter);

const PORT = process.env.port || 5000;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
