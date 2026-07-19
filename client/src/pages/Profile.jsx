import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await API.get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setProfile(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F5FA] dark:bg-[#0A0B10]">
        <h1 className="text-2xl font-semibold dark:text-white">
          Loading Profile...
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F5FA] dark:bg-[#0A0B10] py-10 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Profile Card */}
        <div className="bg-white dark:bg-[#12131A] rounded-2xl shadow-lg p-8 mb-8 border border-black/5 dark:border-white/10">

          <h1 className="text-3xl font-bold mb-6 dark:text-white">
            👤 User Profile
          </h1>

          {/* User Info */}
          <div className="grid md:grid-cols-2 gap-4 text-lg dark:text-gray-300 mb-8">
            <p>
              <strong>Name:</strong> {profile.user.name}
            </p>

            <p>
              <strong>Email:</strong> {profile.user.email}
            </p>
          </div>

          {/* Dashboard Analytics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-5 text-white shadow-lg">
              <p className="text-3xl mb-2">📝</p>
              <h3 className="text-sm opacity-90">Total Blogs</h3>
              <p className="text-3xl font-bold mt-2">
                {profile.totalBlogs}
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl p-5 text-white shadow-lg">
              <p className="text-3xl mb-2">👀</p>
              <h3 className="text-sm opacity-90">Total Views</h3>
              <p className="text-3xl font-bold mt-2">
                {profile.totalViews}
              </p>
            </div>

            <div className="bg-gradient-to-r from-pink-500 to-red-500 rounded-xl p-5 text-white shadow-lg">
              <p className="text-3xl mb-2">❤️</p>
              <h3 className="text-sm opacity-90">Total Likes</h3>
              <p className="text-3xl font-bold mt-2">
                {profile.totalLikes}
              </p>
            </div>

            <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-5 text-white shadow-lg">
              <p className="text-3xl mb-2">💬</p>
              <h3 className="text-sm opacity-90">Total Comments</h3>
              <p className="text-3xl font-bold mt-2">
                {profile.totalComments}
              </p>
            </div>

          </div>

        </div>

        {/* Blogs */}
        <div className="bg-white dark:bg-[#12131A] rounded-2xl shadow-lg p-8 border border-black/5 dark:border-white/10">

          <h2 className="text-2xl font-semibold mb-6 dark:text-white">
            My Blogs
          </h2>

          {profile.blogs.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">
              You haven't created any blogs yet.
            </p>
          ) : (
            <div className="space-y-6">
              {profile.blogs.map((blog) => (
                <Link
                  key={blog._id}
                  to={`/blog/${blog._id}`}
                  className="group block rounded-xl border border-black/5 dark:border-white/10 overflow-hidden bg-white dark:bg-[#181A22] hover:border-[#7C5CFC] transition-all hover:shadow-lg"
                >
                  {blog.image && (
                    <div className="overflow-hidden">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}

                  <div className="p-5">

                    <h3 className="text-xl font-semibold dark:text-white group-hover:text-[#7C5CFC] transition-colors">
                      {blog.title}
                    </h3>

                    <p className="mt-2 text-gray-600 dark:text-gray-400 line-clamp-2">
                      {blog.content}
                    </p>

                    <div className="flex flex-wrap justify-between items-center mt-4 gap-2">

                      <div className="flex gap-5 text-sm">
                        <span className="text-red-500 font-medium">
                          ❤️ {blog.likes.length}
                        </span>

                        <span className="text-blue-500 font-medium">
                          👀 {blog.views}
                        </span>
                      </div>

                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(blog.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>

                    </div>

                  </div>
                </Link>
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default Profile;