import mongoose from "mongoose";

const connectDatabase = () => {
  mongoose.connect(process.env.MONGODB_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;
  db.on("error", () => console.log("cannot connect to database"));
  db.once("open", function () {
    console.log("connected to database");
  });
};

export default connectDatabase;
