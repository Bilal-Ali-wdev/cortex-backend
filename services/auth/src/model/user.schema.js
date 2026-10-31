import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fireBaseUid: {
      type: String,
      required: true,
    },
    email: String,
    name: String,
    avatar: String,
  },
  { timestamps: true },
);

// 52 mins 

export const User = mongoose.model("User",userSchema)