import express from "express";
const app = express();
import connectDatabase from "./database";

connectDatabase();

app.get("/", (req, res) => {
  res.send("hello");
});

import eventRouter from "./routes/event";
app.use("/api/events", eventRouter);

import participantRouter from "./routes/participants";
app.use("/api/events/:eventId/participants", participantRouter);

const PORT = process.env.port || 5000;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
