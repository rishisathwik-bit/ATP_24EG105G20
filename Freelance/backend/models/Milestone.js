import mongoose from "mongoose";

const milestoneSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },

  title:{
      type: String,
      required: [true, "Title is required"],
    },

  description: {
      type: String,
      required: [true, "Description is required"],
    },

  amount: {
      type: Number,
      required: [true, "Amount is required"],
    },

  dueDate: Date,

  status: {
    type: String,
    enum: ['pending', 'submitted', 'approved', 'paid'],
    default: 'pending'
  }

}, {
    timestamps: true,
    versionKey: false,
    strict: "throw",
  })

export default mongoose.model("Milestone", milestoneSchema);
