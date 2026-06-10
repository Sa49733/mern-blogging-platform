import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [keyword, setKeyword] = useState("");

  const fetchBlogs = async () => {
    try {
      const res = await API.get(`/blogs?keyword=${keyword}`);
      setBlogs(res.data.blogs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Search blogs..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="flex-1 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={fetchBlogs}
          className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>

      <h1 className="text-4xl font-bold text-center mb-8">
        All Blogs
      </h1>

      {blogs.length === 0 ? (
        <p className="text-center text-gray-500">
          No blogs found
        </p>
      ) : (
        <div className="grid gap-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition"
            >
              <Link to={`/blog/${blog._id}`}>
                <h2 className="text-2xl font-semibold text-blue-600 hover:underline">
                  {blog.title}
                </h2>
              </Link>

              <p className="mt-3 text-gray-700">
                {blog.content}
              </p>

              <small className="block mt-4 text-gray-500">
                Author: {blog.author.name}
              </small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;