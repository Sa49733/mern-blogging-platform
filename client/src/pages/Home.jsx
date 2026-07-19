import { useEffect, useState } from "react";
import API, { toggleLike } from "../services/api";
import { Link } from "react-router-dom";

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/blogs?keyword=${keyword}`);
      setBlogs(res.data.blogs);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (e, blogId) => {
    e.preventDefault();

    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        alert("Please login to like this blog.");
        return;
      }

      await toggleLike(blogId, user.token);

      fetchBlogs();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-[#F4F5FA] dark:bg-[#0A0B10] transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-[#14151C] dark:text-white">
            All posts
          </h1>

          <p className="text-sm mt-1.5 text-slate-500 dark:text-[#8B8D98]">
            Stories and ideas from the community.
          </p>
        </div>

        <div className="flex gap-2 mb-8">
          <input
            type="text"
            placeholder="Search posts by title..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchBlogs()}
            className="flex-1 h-12 rounded-lg px-4 text-sm outline-none transition-colors
              bg-white border border-black/10 text-[#14151C] placeholder-slate-400
              focus:border-[#7C5CFC]/70
              dark:bg-white/[0.03] dark:border-white/10 dark:text-white dark:placeholder-[#8B8D98]
              dark:focus:border-[#7C5CFC]/70"
          />

          <button
            onClick={fetchBlogs}
            className="h-12 px-6 rounded-lg text-sm font-medium text-white transition-all
              bg-gradient-to-r from-[#7C5CFC] to-[#4F7FFF]
              hover:brightness-110 active:brightness-95
              shadow-[0_4px_20px_-4px_rgba(124,92,252,0.5)]"
          >
            Search
          </button>
        </div>

        {loading ? (
          <div className="grid gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-32 rounded-xl animate-pulse bg-white border border-black/5 dark:bg-white/[0.03] dark:border-white/10"
              />
            ))}
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-20 rounded-xl border border-dashed border-black/10 dark:border-white/10">
            <p className="text-slate-500 dark:text-[#8B8D98]">
              No posts found. Try a different search, or be the first to publish
              one.
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {blogs.map((blog) => (
              <Link
                key={blog._id}
                to={`/blog/${blog._id}`}
                className="group block rounded-xl p-6 transition-all
                  bg-white border border-black/5
                  hover:border-[#7C5CFC]/40
                  hover:shadow-[0_12px_30px_-16px_rgba(30,20,80,0.25)]
                  dark:bg-[#12131A]
                  dark:border-white/10
                  dark:hover:border-[#7C5CFC]/50
                  dark:hover:shadow-[0_0_40px_-18px_rgba(124,92,252,0.4)]"
              >
                {blog.image && (
                  <img
                    src={blog.image}
                    alt={blog.title}
                     className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                )}

                <h2 className="text-xl font-semibold text-[#14151C] dark:text-white group-hover:text-[#7C5CFC] dark:group-hover:text-[#9E86FF] transition-colors">
                  {blog.title}
                </h2>

                <p className="mt-2.5 text-sm leading-6 text-slate-600 dark:text-[#B4B6C2] line-clamp-3">
                  {blog.content}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-[#8B8D98]">
                    <span className="w-5 h-5 rounded-full bg-gradient-to-br from-[#7C5CFC] to-[#4F7FFF] flex items-center justify-center text-[10px] font-medium text-white">
                      {blog.author.name.charAt(0).toUpperCase()}
                    </span>

                    {blog.author.name}
                  </div>

                  <button
                    onClick={(e) => handleLike(e, blog._id)}
                    className="text-red-500 font-medium hover:scale-110 transition"
                  >
                    ❤️ {blog.likes?.length || 0}
                  </button>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;