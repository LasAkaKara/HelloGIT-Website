// server/seed/updateBlogs.seed.js
import mongoose from "mongoose";
import Post from "../models/post.models.js";
import dotenv from "dotenv";

dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

// Update all blogs with event dates
const updateBlogsWithEventDates = async () => {
  try {
    // Get all blogs
    const blogs = await Post.find({});

    // Create realistic event dates (past and future)
    const now = new Date();
    const startDate = new Date(now);
    startDate.setMonth(now.getMonth() - 3); // Go back 3 months for past events

    for (let i = 0; i < blogs.length; i++) {
      const blog = blogs[i];

      // Create a date between 3 months ago and 3 months from now
      const eventDate = new Date(startDate);
      eventDate.setDate(startDate.getDate() + i * 7); // Space out by 1 week

      // Add some randomness to make it look more natural
      const randomDays = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
      eventDate.setDate(eventDate.getDate() + randomDays);

      // Set random time between 10:00 and 18:00
      const randomHour = 10 + Math.floor(Math.random() * 8);
      eventDate.setHours(randomHour, 0, 0, 0);

      // Update the blog with the event date
      await Post.findByIdAndUpdate(blog._id, {
        $set: {
          date: eventDate,
          updatedAt: new Date(),
        },
      });

      console.log(
        `Updated blog: "${
          blog.title
        }" with event date: ${eventDate.toLocaleString()}`
      );
    }

    console.log("\n✅ All blogs have been updated with event dates");
    console.log(`📅 Total blogs updated: ${blogs.length}`);

    // Add index on the date field for better query performance
    await Post.collection.createIndex({ date: 1 });
    console.log("🔍 Created index on date field for better query performance");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error updating blogs:", error);
    process.exit(1);
  }
};

// Run the update
const runUpdate = async () => {
  try {
    await connectDB();
    await updateBlogsWithEventDates();
  } catch (error) {
    console.error("❌ Script failed:", error);
    process.exit(1);
  }
};

// Start the update
console.log("🚀 Starting blog event dates update...");
runUpdate();
