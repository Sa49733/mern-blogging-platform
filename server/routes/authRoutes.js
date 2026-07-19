import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  registerUser,
  loginUser,
  getProfile,
  toggleBookmark,
  getBookmarks,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected Routes
router.get("/profile", protect, getProfile);

router.post("/bookmark/:blogId", protect, toggleBookmark);

router.get("/bookmarks", protect, getBookmarks);

export default router;