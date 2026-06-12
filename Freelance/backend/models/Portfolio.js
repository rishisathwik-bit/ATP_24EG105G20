import { Schema, model, Types } from "mongoose";

const portfolioSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  title: String,

  description: String,

  techStack: [String],

  githubLink: String,

  liveLink: String,

  images: [String]
})