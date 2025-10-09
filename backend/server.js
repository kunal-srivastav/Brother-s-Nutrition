import "dotenv/config.js";
import express from "express";
import path from "path";
import connectDB from "./db/db-connection.js";
connectDB();
import userRouter from "./router/userRouter.js";
import productRouter from "./router/productRouter.js";
import cartRouter from "./router/cartRouter.js";
import orderRouter from "./router/orderRouter.js";
import reviewRouter from "./router/reviewRouter.js"
import cookieParser from "cookie-parser";
import cors from "cors";
const port = process.env.PORT || 3000;
const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true, // Allow cookies to be sent with requests
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(path.resolve(), "public")));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/carts", cartRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/reviews", reviewRouter);

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});