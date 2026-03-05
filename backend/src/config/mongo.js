import mongoose from "mongoose"

export const connectMongo = async (mongoUrl) => {
  if (!mongoUrl) {
    throw new Error("Mongo URL is undefined");
  }
  try {
    await mongoose.connect(mongoUrl);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    // don't rethrow - let the server stay alive
  }
}