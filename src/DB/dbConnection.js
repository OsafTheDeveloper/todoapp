import mongoose from "mongoose";

function databaseConnection() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  mongoose
    .connect("mongodb://127.0.0.1:27017/todoapp", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database is Connected");
    })
    .catch((e) => {
      console.error("Database connection error:", e.message);
    });
}

export default databaseConnection;
