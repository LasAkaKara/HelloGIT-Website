// server/controllers/posts.js
import Post from "../models/post.models.js";

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({ status: "published" }).sort({
      createdAt: -1,
    });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch posts" });
  }
};

export const createPost = async (req, res) => {
  try {
    const post = new Post(req.body);
    await post.save();
    return res.status(201).json(post);
  } catch (err) {
    if (err.name === "ValidationError")
      return res
        .status(400)
        .json({ msg: "Validation failed", errors: err.errors });
    return res.status(500).json({ msg: "Server error" });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch post" });
  }
};

export const updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ msg: "Failed to update post" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.json({ msg: "Post deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Failed to delete post" });
  }
};
