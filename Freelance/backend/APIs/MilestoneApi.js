import express from "express";
import Milestone from "../models/Milestone.js";
import Project from "../models/Project.js";
import { verifyToken } from "../middlewares.js/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken("client", "admin"), async (req, res, next) => {
  try {
    const { project, title, description, amount, dueDate } = req.body;
    if (!project || !title || !description || !amount) {
      return res.status(400).json({ message: "project, title, description and amount are required" });
    }

    const projectDoc = await Project.findById(project);
    if (!projectDoc) {
      return res.status(404).json({ message: "Project not found" });
    }
    if (projectDoc.client.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to add milestones to this project" });
    }

    const milestone = await Milestone.create({ project, title, description, amount, dueDate });
    res.status(201).json({ message: "Milestone created", milestone });
  } catch (err) {
    next(err);
  }
});

router.get("/project/:projectId", verifyToken("student", "client", "admin"), async (req, res, next) => {
  try {
    const milestones = await Milestone.find({ project: req.params.projectId }).sort({ createdAt: 1 });
    res.json({ milestones });
  } catch (err) {
    next(err);
  }
});

router.patch("/:id", verifyToken("client", "admin"), async (req, res, next) => {
  try {
    const milestone = await Milestone.findById(req.params.id);
    if (!milestone) {
      return res.status(404).json({ message: "Milestone not found" });
    }
    const project = await Project.findById(milestone.project);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    if (project.client.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    Object.assign(milestone, req.body);
    await milestone.save();
    res.json({ message: "Milestone updated", milestone });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", verifyToken("client", "admin"), async (req, res, next) => {
  try {
    const milestone = await Milestone.findById(req.params.id);
    if (!milestone) {
      return res.status(404).json({ message: "Milestone not found" });
    }
    const project = await Project.findById(milestone.project);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    if (project.client.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    await milestone.deleteOne();
    res.json({ message: "Milestone removed" });
  } catch (err) {
    next(err);
  }
});

export default router;
