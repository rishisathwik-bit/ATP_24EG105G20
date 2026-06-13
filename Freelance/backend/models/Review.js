import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },

  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  freelancer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  rating: {
    type: Number,
    min: 1,
    max: 5
  },

  comment: String

}, {
    timestamps: true,
    versionKey: false,
    strict: "throw",
  })

export default mongoose.model("Review", reviewSchema);
