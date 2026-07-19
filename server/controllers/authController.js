import User from "../models/User.js";
import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ================= Register User =================
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= Login User =================
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Email or Password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Email or Password",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= User Profile + Dashboard =================
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    const blogs = await Blog.find({
      author: req.user._id,
    }).sort({
      createdAt: -1,
    });

    const totalBlogs = blogs.length;

    const totalLikes = blogs.reduce(
      (sum, blog) => sum + (blog.likes?.length || 0),
      0
    );

    const totalViews = blogs.reduce(
      (sum, blog) => sum + (blog.views || 0),
      0
    );

    const blogIds = blogs.map((blog) => blog._id);

    const totalComments = await Comment.countDocuments({
      blog: { $in: blogIds },
    });

    res.status(200).json({
      user,
      totalBlogs,
      totalLikes,
      totalViews,
      totalComments,
      blogs,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= Bookmark / Remove Bookmark =================
export const toggleBookmark = async (req, res) => {
  try {
    const { blogId } = req.params;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    const alreadyBookmarked = user.bookmarks.some(
      (id) => id.toString() === blogId
    );

    if (alreadyBookmarked) {
      user.bookmarks = user.bookmarks.filter(
        (id) => id.toString() !== blogId
      );

      await user.save();

      return res.status(200).json({
        message: "Bookmark removed",
        bookmarked: false,
      });
    }

    user.bookmarks.push(blogId);

    await user.save();

    res.status(200).json({
      message: "Blog bookmarked",
      bookmarked: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= Get All Bookmarked Blogs =================
export const getBookmarks = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: "bookmarks",
      populate: {
        path: "author",
        select: "name email",
      },
    });

    res.status(200).json(user.bookmarks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};