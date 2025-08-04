import Express from "express";
import dotenv from "dotenv";
import cors from "cors";
import postRoutes from "./routes/post.routes.js";
import eventRoutes from "./routes/event.routes.js";
import projectRoutes from "./routes/project.routes.js";
import teamRoutes from "./routes/team.routes.js";
import authRoutes from "./routes/auth.routes.js";
import syncPostRoutes from "./routes/syncPost.routes.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();
export const app = Express();
app.use(Express.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/", (req, res) => {
  res.send("GCBS HomePage!");
  console.log("Accessed Successfully!");
});

app.use("/api/posts", postRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/sync_posts", syncPostRoutes);
app.use("/api/users", userRoutes);
