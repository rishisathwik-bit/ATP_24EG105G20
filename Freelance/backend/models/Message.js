import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },

  message: String,

  read: {
    type: Boolean,
    default: false
  }

}, {
    timestamps: true,
    versionKey: false,
    strict: "throw",
  })

export default mongoose.model("Message", messageSchema);
