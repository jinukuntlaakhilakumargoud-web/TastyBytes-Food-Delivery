import express from "express";
import cors from "cors";

import userRouter from "../backend/routes/userRoute.js";
import foodRouter from "../backend/routes/foodRoute.js";
import cartRouter from "../backend/routes/cartRoute.js";
import orderRouter from "../backend/routes/orderRoute.js";
import dotenv from "dotenv";

dotenv.config({ path: "./backend/.env" });

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

import { connectDB } from "../backend/config/db.js";

// Connect to DB before every request
app.use(async (req, res, next) => {
    await connectDB();
    next();
});

// API endpoints
app.use("/api/user", userRouter);
app.use("/api/food", foodRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/api", (req, res) => {
    res.json({ success: true, message: "TastyBytes API Working" });
});

export default app;
