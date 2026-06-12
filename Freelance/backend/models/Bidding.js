import mongoose from "mongoose";

const bidSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true
  },

  bidder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  bidAmount: {
    type: Number,
    required: true
  },

  proposal: {
    type: String,
    required: true
  },

  estimatedDays: {
    type: Number,
    required: true
  },

  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending"
  }

}, { timestamps: true });

const Bid = mongoose.model("Bid", bidSchema);

export default Bid;
