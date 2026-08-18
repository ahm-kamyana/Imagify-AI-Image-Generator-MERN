const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    // Event listeners
    mongoose.connection.on("connected", () => {
      console.log("MongoDB connected successfully ");
    });

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error", err);
    });

    console.log("Connecting to MongoDB...");
    await mongoose.connect(`${process.env.MONGO_URI}/imagify`);
  } catch (err) {
    console.error("MongoDB connection failed", err);
    process.exit(1);
  }
};

module.exports = connectDB;
