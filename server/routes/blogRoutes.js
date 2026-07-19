import express from "express";
import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

import {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  toggleLike,
} from "../controllers/blogController.js";

const router = express.Router();

// Public Routes
router.get("/", getBlogs);
router.get("/:id", getBlogById);

// Protected Routes
router.post("/", protect, upload.single("image"), createBlog);
router.put("/:id", protect, updateBlog);
router.put("/:id/like", protect, toggleLike);
router.delete("/:id", protect, deleteBlog);

export default router;