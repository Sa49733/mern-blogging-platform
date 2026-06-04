import Comment from "../models/Comment.js";

// Add Comment
export const addComment = async (req, res) => {
  try {
    const { text } = req.body;

    const comment = await Comment.create({
      text,
      user: req.user._id,
      blog: req.params.blogId,
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Comments of a Blog
export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({
      blog: req.params.blogId,
    })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};