import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes.js"
import chatRoutes from "./modules/chat/chat.routes.js"
import { errorHandler } from "./middleware/error.middleware.js";
import { env } from "./config/env.js";

export const app = express();
const { CLIENT_URL } = env();

app.use(cors({ origin: CLIENT_URL, methods: ["GET", "POST", "PUT", "DELETE"], credentials: true}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("api/chat", chatRoutes);
app.get("/test", (req, res) => res.json({ ok:true }));

app.use(errorHandler);