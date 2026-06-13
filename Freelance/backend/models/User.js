import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
      type: String,
      required: [true, "Username is required"],
    },
  email: {
      type: String,
      required: [true, "Email required"],
      unique: [true, "Email already existed"],
    },
  password:{
      type: String,
      required: [true, "Password required"],
    },

  role: {
    type: String,
    enum: ['student', 'client', 'admin']
  },

  profilePic: String,
  bio: String,
  college: String,

  skills: [String],

  github: String,
  linkedin: String,

  rating: {
    type: Number,
    default: 0
  },

  completedProjects: {
    type: Number,
    default: 0
  },
  isUserActive:{
        type:Boolean,
        default:true
    }
}, 
  {
    timestamps: true,
    versionKey: false,
    strict: "throw",
  },

)

export default mongoose.model("User", userSchema);
