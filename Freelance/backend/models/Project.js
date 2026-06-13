import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title:{
      type: String,
      required: [true, "Project title is required"],
    },

  description: {
      type: String,
      required: [true, "Project description is required"],
    },

  budget: {
      type: Number,
      required: [true, "Project budget is required"],
    },

  deadline: {
      type: Date,
      required: [true, "Project deadline is required"],
    },

  skillsRequired: [String],

  attachments: [String],

  status: {
    type: String,
    enum: ['open', 'in-progress', 'completed', 'cancelled'],
    default: 'open'
  },

  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  selectedFreelancer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }

}, {
    timestamps: true,
    versionKey: false,
    strict: "throw",
  })

export default mongoose.model("Project", projectSchema);
