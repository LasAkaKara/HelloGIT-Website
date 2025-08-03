// server/models/Event.js
import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  shortDesc: { type: String, required: true }, // brief card blurb
  fullDesc: { type: String }, // optional long copy
  dateStart: { type: Date, required: true },
  dateEnd: { type: Date }, // allow single‑day events
  location: { type: String, required: true },
  host: { type: String, required: true },
  imageUrl: { type: String },
  status: { type: String, enum: ["draft", "published"], default: "published" },
  likes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

// helpful compound index for text search
eventSchema.index({ title: "text", shortDesc: "text", location: "text" });

export default mongoose.model("Event", eventSchema);
