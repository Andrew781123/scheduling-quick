import express from "express";
const app = express();
import connectDatabase from "./database";
import cors from "cors";
import dotenv from "dotenv";
import path from 'path';

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

//deploy
if(process.env.NODE_ENV === 'production') {
  app.use(express.static('../frontend/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '/../frontend', 'build', 'index.html'));
  });
}

const PORT = process.env.port || 5000;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
