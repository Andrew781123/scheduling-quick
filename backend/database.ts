import mongoose from "mongoose";

const connectDatabase = () => {
  mongoose.connect("mongodb://localhost:27017/making-date", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function () {
    console.log("connected to database");
  });
};

export default connectDatabase;
