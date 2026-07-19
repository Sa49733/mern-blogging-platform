import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
  addComment,
  getComments,
  toggleCommentLike,
} from "../controllers/commentController.js";

const router = express.Router();

// Add Comment
router.post("/:blogId", protect, addComment);

// Get Comments of a Blog
router.get("/:blogId", getComments);

// Like / Unlike Comment
router.post("/like/:commentId", protect, toggleCommentLike);

export default router;