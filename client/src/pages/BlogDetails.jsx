import { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: currentUser } = useContext(AuthContext);

  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [posting, setPosting] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
const [bookmarkLoading, setBookmarkLoading] = useState(false);

  const fetchData = async () => {
    try {
      const blogRes = await API.get(`/blogs/${id}`);
      setBlog(blogRes.data);
      if (currentUser?.token) {
  try {
    const bookmarkRes = await API.get("/auth/bookmarks", {
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
      },
    });

    const saved = bookmarkRes.data.some(
      (item) => item._id === blogRes.data._id
    );

    setBookmarked(saved);
  } catch (error) {
    console.log(error);
  }
}

      const commentRes = await API.get(`/comments/${id}`);
      setComments(commentRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const addComment = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      toast.error("Please sign in to comment");
      navigate("/login");
      return;
    }

    if (!text.trim()) return;

    setPosting(true);

    try {
      await API.post(
        `/comments/${id}`,
        { text },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );

      setText("");
      await fetchData();
      toast.success("Comment added");
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not add comment");
    } finally {
      setPosting(false);
    }
  };

  const deleteBlog = async () => {
    if (!window.confirm("Delete this post? This can't be undone.")) return;

    try {
      await API.delete(`/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });

      toast.success("Blog deleted successfully");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not delete post");
    }
  };
  

  // Copy Blog Link
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("🔗 Link copied!");
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };
  const toggleBookmark = async () => {
  if (!currentUser) {
    toast.error("Please login first");
    navigate("/login");
    return;
  }

  try {
    setBookmarkLoading(true);

    const res = await API.post(
      `/auth/bookmark/${blog._id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      }
    );

    setBookmarked(res.data.bookmarked);
    toast.success(res.data.message);
  } catch (error) {
    toast.error(error.response?.data?.message || "Something went wrong");
  } finally {
    setBookmarkLoading(false);
  }
};
const toggleCommentLike = async (commentId) => {
  if (!currentUser) {
    toast.error("Please login first");
    navigate("/login");
    return;
  }

  try {
    await API.post(
      `/comments/like/${commentId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      }
    );

    await fetchData();
  } catch (error) {
    toast.error(error.response?.data?.message || "Something went wrong");
  }
};

  // Share URLs
  const shareUrl = encodeURIComponent(window.location.href);
  const shareTitle = encodeURIComponent(blog?.title || "");

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#F4F5FA] dark:bg-[#0A0B10] transition-colors duration-300">
        <div className="max-w-3xl mx-auto px-4 py-10 space-y-4">
          <div className="h-10 w-2/3 rounded-lg animate-pulse bg-black/[0.03] dark:bg-white/[0.03]" />
          <div className="h-4 w-full rounded animate-pulse bg-black/[0.03] dark:bg-white/[0.03]" />
          <div className="h-4 w-full rounded animate-pulse bg-black/[0.03] dark:bg-white/[0.03]" />
          <div className="h-4 w-2/3 rounded animate-pulse bg-black/[0.03] dark:bg-white/[0.03]" />
        </div>
      </div>
    );
  }
    return (
    <div className="min-h-screen bg-[#F4F5FA] dark:bg-[#0A0B10] transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-4 py-10">

        <div className="rounded-2xl overflow-hidden bg-white border border-black/5 shadow-[0_20px_60px_-24px_rgba(30,20,80,0.15)] dark:bg-[#12131A] dark:border-white/10 dark:shadow-[0_0_60px_-20px_rgba(124,92,252,0.25)]">

          {blog.image && (
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full max-h-[600px] object-contain rounded-t-2xl bg-black"
            />
          )}

          <div className="p-8">

            <h1 className="text-3xl font-semibold tracking-tight text-[#14151C] dark:text-white mb-4">
              {blog.title}
            </h1>

            <div className="mb-6">
              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-[#8B8D98]">
                <span className="w-6 h-6 rounded-full bg-gradient-to-br from-[#7C5CFC] to-[#4F7FFF] flex items-center justify-center text-[11px] font-medium text-white">
                  {blog.author.name.charAt(0).toUpperCase()}
                </span>

                <span>{blog.author.name}</span>
              </div>

              <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-slate-500 dark:text-[#8B8D98]">
                <span>👀 {blog.views} views</span>

                <span>•</span>

                <span>
                  📖{" "}
                  {Math.max(
                    1,
                    Math.ceil(blog.content.split(" ").length / 200)
                  )}{" "}
                  min read
                </span>

                <span>•</span>

                <span>
                  📅{" "}
                  {new Date(blog.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>

            <p className="leading-8 whitespace-pre-wrap text-[#2B2C36] dark:text-[#D5D6DE]">
              {blog.content}
            </p>

            {/* Share Section */}
            <div className="mt-8 pt-6 border-t border-black/5 dark:border-white/10">
              <h3 className="text-lg font-semibold text-[#14151C] dark:text-white mb-4">
                Share this Blog
              </h3>

              <div className="flex flex-wrap gap-3">
                 <button
    onClick={toggleBookmark}
    disabled={bookmarkLoading}
    className="px-4 py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 transition disabled:opacity-60"
  >
    {bookmarkLoading
      ? "Saving..."
      : bookmarked
      ? "✅ Saved"
      : "🔖 Save Blog"}
  </button>

                <button
                  onClick={copyLink}
                  className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-800 transition"
                >
                  🔗 Copy Link
                </button>

                <a
                  href={`https://wa.me/?text=${shareTitle}%20${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition"
                >
                  💬 WhatsApp
                </a>

                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-blue-700 text-white hover:bg-blue-800 transition"
                >
                  💼 LinkedIn
                </a>

                <a
                  href={`https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-900 transition"
                >
                  🐦 X
                </a>

              </div>
            </div>

            {currentUser?.user?.id === blog.author._id && (
              <div className="flex gap-3 mt-8 pt-6 border-t border-black/5 dark:border-white/10">
                <Link to={`/edit-blog/${blog._id}`}>
                  <button className="h-10 px-4 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-[#F0B429] to-[#F0742A] hover:brightness-110">
                    Edit Post
                  </button>
                </Link>

                <button
                  onClick={deleteBlog}
                  className="h-10 px-4 rounded-lg text-sm font-medium text-red-600 border border-red-200 hover:bg-red-50 dark:text-red-400 dark:border-red-500/30 dark:hover:bg-red-500/10"
                >
                  Delete Post
                </button>
              </div>
            )}
          </div>
        </div>
                <div className="mt-8">
          <h2 className="text-lg font-semibold text-[#14151C] dark:text-white mb-4">
            {comments.length === 0
              ? "Comments"
              : `Comments (${comments.length})`}
          </h2>

          <form onSubmit={addComment} className="flex gap-2 mb-6">
            <input
              type="text"
              placeholder={
                currentUser
                  ? "Write a comment..."
                  : "Sign in to comment"
              }
              value={text}
              onChange={(e) => setText(e.target.value)}
              disabled={!currentUser}
              className="flex-1 h-12 rounded-lg px-4 text-sm outline-none bg-white border border-black/10 dark:bg-white/[0.03] dark:border-white/10 dark:text-white"
            />

            <button
              type="submit"
              disabled={posting || !currentUser}
              className="h-12 px-5 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-[#7C5CFC] to-[#4F7FFF] disabled:opacity-60"
            >
              {posting ? "Posting..." : "Post"}
            </button>
          </form>

          {comments.length === 0 ? (
            <p className="text-sm text-slate-500 dark:text-[#8B8D98]">
              No comments yet. Be the first to say something.
            </p>
          ) : (
            <div className="space-y-3">
              {comments.map((comment) => (
                <div
                  key={comment._id}
                  className="rounded-lg p-4 bg-white border border-black/5 dark:bg-white/[0.03] dark:border-white/10"
                >
                 <p className="text-sm font-medium text-[#14151C] dark:text-white">
  {comment.user.name}
</p>

<p className="text-sm mt-1 text-slate-600 dark:text-[#B4B6C2]">
  {comment.text}
</p>

<div className="mt-3">
  <button
    onClick={() => toggleCommentLike(comment._id)}
    className={`px-3 py-1 rounded-md text-sm transition ${
      comment.likes?.some(
  (user) => user._id === currentUser?.user?.id
)
        ? "bg-red-500 text-white"
        : "bg-gray-200 dark:bg-gray-700 dark:text-white"
    }`}
  >
    ❤️ {comment.likes?.length || 0}
  </button>
</div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default BlogDetails;