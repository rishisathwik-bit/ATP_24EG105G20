import express from "express";
import Bid from "../models/Bidding.js";
import Project from "../models/Project.js";
import { verifyToken } from "../middlewares.js/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken("student", "client", "admin"), async (req, res, next) => {
  try {
    const { project, bidAmount, proposal, estimatedDays } = req.body;
    if (!project || !bidAmount || !proposal || !estimatedDays) {
      return res.status(400).json({ message: "project, bidAmount, proposal, and estimatedDays are required" });
    }

    const existingBid = await Bid.findOne({ project, bidder: req.user.id });
    if (existingBid) {
      return res.status(409).json({ message: "You already placed a bid on this project" });
    }

    const bid = await Bid.create({ project, bidder: req.user.id, bidAmount, proposal, estimatedDays });
    res.status(201).json({ message: "Bid submitted", bid });
  } catch (err) {
    next(err);
  }
});

router.get("/project/:projectId", verifyToken("student", "client", "admin"), async (req, res, next) => {
  try {
    const bids = await Bid.find({ project: req.params.projectId }).populate("bidder", "username email role");
    res.json({ bids });
  } catch (err) {
    next(err);
  }
});

router.get("/user/:userId", verifyToken("student", "client", "admin"), async (req, res, next) => {
  try {
    const bids = await Bid.find({ bidder: req.params.userId }).populate("project", "title status budget");
    res.json({ bids });
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

    const bid = await Bid.findById(req.params.id);
    if (!bid) {
      return res.status(404).json({ message: "Bid not found" });
    }

    const project = await Project.findById(bid.project);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.client.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to update this bid" });
    }

    bid.status = status;
    await bid.save();

    if (status === "accepted") {
      project.selectedFreelancer = bid.bidder;
      project.status = "in-progress";
      await project.save();
    }

    res.json({ message: "Bid status updated", bid });
  } catch (err) {
    next(err);
  }
});

export default router;
