import express from "express";
import Message from "../models/Message.js";
import { verifyToken } from "../middlewares.js/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken("student", "client", "admin"), async (req, res, next) => {
  try {
    const { receiver, project, message } = req.body;
    if (!receiver || !message) {
      return res.status(400).json({ message: "Receiver and message are required" });
    }

    const created = await Message.create({ sender: req.user.id, receiver, project, message });
    res.status(201).json({ message: "Message sent", data: created });
  } catch (err) {
    next(err);
  }
});

router.get("/conversation", verifyToken("student", "client", "admin"), async (req, res, next) => {
  try {
    const { sender, receiver, project } = req.query;
    const filter = {};
    if (sender && receiver) {
      filter.$or = [
        { sender, receiver },
        { sender: receiver, receiver: sender },
      ];
    }
    if (project) {
      filter.project = project;
    }
    const messages = await Message.find(filter).sort({ createdAt: 1 });
    res.json({ messages });
  } catch (err) {
    next(err);
  }
});

router.get("/project/:projectId", verifyToken("student", "client", "admin"), async (req, res, next) => {
  try {
    const messages = await Message.find({ project: req.params.projectId }).sort({ createdAt: 1 });
    res.json({ messages });
  } catch (err) {
    next(err);
  }
});

router.patch("/:id/read", verifyToken("student", "client", "admin"), async (req, res, next) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }
    if (message.receiver.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }
    message.read = true;
    await message.save();
    res.json({ message: "Message marked read", data: message });
  } catch (err) {
    next(err);
  }
});

export default router;
