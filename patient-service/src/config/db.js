const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Patient MongoDB connected");
  } catch (error) {
    console.error("Patient DB connection failed", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
