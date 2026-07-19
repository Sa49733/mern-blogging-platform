import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function SavedBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await API.get("/auth/bookmarks", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setBlogs(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-[#0A0B10]">
        <h1 className="text-2xl dark:text-white">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F5FA] dark:bg-[#0A0B10] py-10 px-4">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold mb-8 dark:text-white">
          🔖 Saved Blogs
        </h1>

        {blogs.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">
            No saved blogs yet.
          </p>
        ) : (
          <div className="space-y-6">
            {blogs.map((blog) => (
              <Link
                key={blog._id}
                to={`/blog/${blog._id}`}
                className="group block rounded-xl border border-black/5 dark:border-white/10 overflow-hidden bg-white dark:bg-[#181A22] hover:border-[#7C5CFC] transition-all hover:shadow-lg"
              >
                {blog.image && (
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-56 object-cover"
                  />
                )}

                <div className="p-5">

                  <h2 className="text-xl font-semibold dark:text-white">
                    {blog.title}
                  </h2>

                  <p className="mt-2 text-gray-600 dark:text-gray-400 line-clamp-2">
                    {blog.content}
                  </p>

                  <div className="flex justify-between mt-4">

                    <span className="text-red-500">
                      ❤️ {blog.likes.length}
                    </span>

                    <span className="text-blue-500">
                      👀 {blog.views}
                    </span>

                    <span className="text-gray-500 dark:text-gray-400">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </span>

                  </div>

                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default SavedBlogs;