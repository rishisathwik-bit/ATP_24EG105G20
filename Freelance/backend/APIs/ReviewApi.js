import express from "express";
import Review from "../models/Review.js";
import { verifyToken } from "../middlewares.js/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken("student", "client", "admin"), async (req, res, next) => {
  try {
    const { project, freelancer, rating, comment } = req.body;
    if (!project || !freelancer || !rating) {
      return res.status(400).json({ message: "project, freelancer, and rating are required" });
    }
    const review = await Review.create({ project, reviewer: req.user.id, freelancer, rating, comment });
    res.status(201).json({ message: "Review submitted", review });
  } catch (err) {
    next(err);
  }
});

router.get("/project/:projectId", verifyToken("student", "client", "admin"), async (req, res, next) => {
  try {
    const reviews = await Review.find({ project: req.params.projectId }).sort({ createdAt: -1 });
    res.json({ reviews });
  } catch (err) {
    next(err);
  }
});

router.get("/freelancer/:freelancerId", verifyToken("student", "client", "admin"), async (req, res, next) => {
  try {
    const reviews = await Review.find({ freelancer: req.params.freelancerId }).sort({ createdAt: -1 });
    res.json({ reviews });
  } catch (err) {
    next(err);
  }
});

export default router;
