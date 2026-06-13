import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  text:{
      type: String,
      required: [true, "Text is required"],
    },

  isRead: {
    type: Boolean,
    default: false
  }

}, { timestamps: true })

export default mongoose.model("Notification", notificationSchema);
