import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "../backend/routes/userRoute.js";
import foodRouter from "../backend/routes/foodRoute.js";
import cartRouter from "../backend/routes/cartRoute.js";
import orderRouter from "../backend/routes/orderRoute.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Serverless DB connection with caching
let isConnected = false;
const connectDB = async () => {
    if (isConnected) return;
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        isConnected = true;
        console.log("DB Connected (serverless)");
    } catch (error) {
        console.log("DB Connection Error:", error);
    }
};

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
