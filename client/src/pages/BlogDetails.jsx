import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  const currentUser = JSON.parse(
    localStorage.getItem("user")
  );

  const fetchData = async () => {
    try {
      const blogRes = await API.get(`/blogs/${id}`);
      setBlog(blogRes.data);

      const commentRes = await API.get(`/comments/${id}`);
      setComments(commentRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const addComment = async (e) => {
    e.preventDefault();

    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      await API.post(
        `/comments/${id}`,
        { text },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setText("");
      await fetchData();

      alert("Comment Added");
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const deleteBlog = async () => {
    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      await API.delete(`/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      alert("Blog Deleted Successfully");

      navigate("/");
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  if (!blog) {
    return (
      <div className="text-center mt-10 text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-4xl font-bold mb-4">
          {blog.title}
        </h1>

        <p className="text-gray-700 leading-7 mb-6">
          {blog.content}
        </p>

        <p className="text-gray-500 mb-6">
          Author: {blog.author.name}
        </p>

        {currentUser?.user?.id === blog.author._id && (
          <div className="flex gap-3 mb-8">
            <Link to={`/edit-blog/${blog._id}`}>
              <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition">
                Edit Blog
              </button>
            </Link>

            <button
              onClick={deleteBlog}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Delete Blog
            </button>
          </div>
        )}

        <hr className="my-6" />

        <h2 className="text-2xl font-semibold mb-4">
          Add Comment
        </h2>

        <form
          onSubmit={addComment}
          className="flex gap-2 mb-8"
        >
          <input
            type="text"
            placeholder="Write a comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-5 rounded-lg hover:bg-blue-700 transition"
          >
            Add
          </button>
        </form>

        <h2 className="text-2xl font-semibold mb-4">
          Comments
        </h2>

        {comments.length === 0 ? (
          <p className="text-gray-500">
            No comments yet
          </p>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <div
                key={comment._id}
                className="bg-gray-100 p-4 rounded-lg"
              >
                <p className="font-semibold">
                  {comment.user.name}
                </p>

                <p className="text-gray-700 mt-1">
                  {comment.text}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogDetails;