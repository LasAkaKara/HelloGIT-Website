// server/models/Post.js
import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  summary: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: Date, required: true },
  imageUrl: { type: String },
  status: { type: String, enum: ["draft", "published"], default: "published" },
  likes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Post", postSchema);
