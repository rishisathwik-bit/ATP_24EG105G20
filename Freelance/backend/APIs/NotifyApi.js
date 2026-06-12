import express from "express";
import Notification from "../models/Notifcy.js";
import { verifyToken } from "../middlewares.js/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken("student", "client", "admin"), async (req, res, next) => {
  try {
    const { user, text } = req.body;
    if (!user || !text) {
      return res.status(400).json({ message: "user and text are required" });
    }
    const notification = await Notification.create({ user, text });
    res.status(201).json({ message: "Notification created", notification });
  } catch (err) {
    next(err);
  }
});

router.get("/user/:userId", verifyToken("student", "client", "admin"), async (req, res, next) => {
  try {
    const notifications = await Notification.find({ user: req.params.userId }).sort({ createdAt: -1 });
    res.json({ notifications });
  } catch (err) {
    next(err);
  }
});

router.patch("/:id/read", verifyToken("student", "client", "admin"), async (req, res, next) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    notification.isRead = true;
    await notification.save();
    res.json({ message: "Notification marked read", notification });
  } catch (err) {
    next(err);
  }
});

export default router;
