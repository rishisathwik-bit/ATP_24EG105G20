import express from "express";
import Project from "../models/Project.js";
import { verifyToken } from "../middlewares.js/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken("client", "admin"), async (req, res, next) => {
  try {
    const { title, description, budget, deadline, skillsRequired, attachments } = req.body;
    if (!title || !description || !budget || !deadline) {
      return res.status(400).json({ message: "title, description, budget and deadline are required" });
    }

    const project = await Project.create({
      title,
      description,
      budget,
      deadline,
      skillsRequired,
      attachments,
      client: req.user.id,
    });

    res.status(201).json({ message: "Project created", project });
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.status) {
      filter.status = req.query.status;
    }
    const projects = await Project.find(filter).populate("client", "username email role").populate("selectedFreelancer", "username email role");
    res.json({ projects });
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id).populate("client", "username email role").populate("selectedFreelancer", "username email role");
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json({ project });
  } catch (err) {
    next(err);
  }
});

router.get("/client/:clientId", async (req, res, next) => {
  try {
    const projects = await Project.find({ client: req.params.clientId }).populate("selectedFreelancer", "username email role");
    res.json({ projects });
  } catch (err) {
    next(err);
  }
});

router.patch("/:id", verifyToken("client", "admin"), async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    if (project.client.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to update this project" });
    }

    Object.assign(project, req.body);
    await project.save();
    res.json({ message: "Project updated", project });
  } catch (err) {
    next(err);
  }
});

router.patch("/:id/select-freelancer", verifyToken("client", "admin"), async (req, res, next) => {
  try {
    const { freelancerId } = req.body;
    if (!freelancerId) {
      return res.status(400).json({ message: "freelancerId is required" });
    }

    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    if (project.client.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    project.selectedFreelancer = freelancerId;
    project.status = "in-progress";
    await project.save();
    res.json({ message: "Freelancer selected", project });
  } catch (err) {
    next(err);
  }
});

router.patch("/:id/status", verifyToken("client", "admin"), async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    if (project.client.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }
    project.status = status;
    await project.save();
    res.json({ message: "Project status updated", project });
  } catch (err) {
    next(err);
  }
});

export default router;
