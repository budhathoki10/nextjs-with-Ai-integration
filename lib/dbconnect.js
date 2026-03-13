// lib/dbconnect.js
import mongoose from "mongoose";

const connectToDatabase = async () => {
  try {
    if (mongoose.connections[0].readyState) return; // already connected
    await mongoose.connect(process.env.MONGOURI);
    console.log("Successfully connected to database");
  } catch (error) {
    console.error("Error connecting to database", error);
  }
};

export default connectToDatabase;