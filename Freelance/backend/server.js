import exp from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from "./APIs/AuthApi.js";
import userRoutes from "./APIs/UserApi.js";
import projectRoutes from "./APIs/ProjectApi.js";
import reviewRoutes from "./APIs/ReviewApi.js";
import messageRoutes from "./APIs/MessageApi.js";
import biddingRoutes from "./APIs/BiddingApi.js";
import milestoneRoutes from "./APIs/MilestoneApi.js";
import notifyRoutes from "./APIs/NotifyApi.js";

dotenv.config();

//create express app
const app = exp();
//enable cors
app.use(cors({
  origin:['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials:true
}));
//add cookie parser middeleware
app.use(cookieParser())
//body parser middleware
app.use(exp.json());

//connect to db
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("DB server connected");
    //assign port
    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log(`server listening on ${port}..`));
  } catch (err) {
    console.log("err in db connect", err);
  }
};

connectDB();

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Backend is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/bids", biddingRoutes);
app.use("/api/milestones", milestoneRoutes);
app.use("/api/notifications", notifyRoutes);

//to handle invalid path
app.use((req, res, next) => {
  console.log(req.url);
  res.status(404).json({ message: `path ${req.url} is invalid` });
});

//Error handling middleware
app.use((err, req, res, next) => {
  console.log("error is ",err)
  console.log("Full error:", JSON.stringify(err, null, 2));
  //ValidationError
  if (err.name === "ValidationError") {
    return res.status(400).json({ message: "error occurred", error: err.message });
  }
  //CastError
  if (err.name === "CastError") {
    return res.status(400).json({ message: "error occurred", error: err.message });
  }
  const errCode = err.code ?? err.cause?.code ?? err.errorResponse?.code;
  const keyValue = err.keyValue ?? err.cause?.keyValue ?? err.errorResponse?.keyValue;

  if (errCode === 11000) {
    const field = Object.keys(keyValue)[0];
    const value = keyValue[field];
    return res.status(409).json({
      message: "error occurred",
      error: `${field} "${value}" already exists`,
    });
  }

  //send server side error
  res.status(500).json({ message: "error occurred", error: "Server side error" });
});
