import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

import express from "express";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db";
import "./models/User";
import "./models/Direction";
import authRoutes from "./routes/auth.routes";
import directeurRoutes from "./routes/directeur.routes";
const app = express();
console.log("MONGO_URI =", process.env.MONGO_URI);
connectDB();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/auth", authRoutes);
app.use("/api/directeur", directeurRoutes);
app.get("/", (req, res) => {
  res.send("API is running...");
});

export default app;