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
.populate("likes", "_id")
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Like / Unlike Comment
export const toggleCommentLike = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    const alreadyLiked = comment.likes.includes(req.user._id);

    if (alreadyLiked) {
      comment.likes.pull(req.user._id);

      await comment.save();

      return res.status(200).json({
        message: "Comment unliked",
        liked: false,
        likes: comment.likes.length,
      });
    }

    comment.likes.push(req.user._id);

    await comment.save();

    res.status(200).json({
      message: "Comment liked",
      liked: true,
      likes: comment.likes.length,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};