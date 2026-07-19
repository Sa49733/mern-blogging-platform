import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { user: currentUser, setUser } = useContext(AuthContext);

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setMenuOpen(false);
    navigate("/login");
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav
      className="sticky top-0 z-50 relative border-b bg-white/80 backdrop-blur-md
      border-black/5 dark:bg-[#0A0B10]/80 dark:border-white/10"
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-2.5"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7C5CFC] to-[#4F7FFF] flex items-center justify-center">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L4 6v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6l-8-4z"
                stroke="white"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <span className="font-semibold text-[#14151C] dark:text-white tracking-tight">
            Blogosphere
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-2">

          <Link
            to="/"
            className="px-3 py-2 rounded-lg text-sm font-medium
            text-slate-600 hover:bg-black/5
            dark:text-[#8B8D98] dark:hover:bg-white/5"
          >
            Home
          </Link>

          {currentUser && (
            <>
              <Link
                to="/create-blog"
                className="px-4 py-2 rounded-lg text-sm font-medium
                bg-gradient-to-r from-[#7C5CFC] to-[#4F7FFF]
                text-white hover:brightness-110 transition"
              >
                ➕ New Post
              </Link>

              <Link
                to="/saved"
                className="px-3 py-2 rounded-lg text-sm font-medium
                text-slate-600 hover:bg-black/5
                dark:text-[#8B8D98] dark:hover:bg-white/5"
              >
                🔖 Saved
              </Link>

              <Link
                to="/profile"
                className="px-3 py-2 rounded-lg text-sm font-medium
                text-slate-600 hover:bg-black/5
                dark:text-[#8B8D98] dark:hover:bg-white/5"
              >
                👤 Profile
              </Link>
            </>
          )}

          {currentUser ? (
            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-lg text-sm font-medium
              text-slate-600 hover:bg-black/5
              dark:text-[#8B8D98] dark:hover:bg-white/5"
            >
              🚪 Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="px-3 py-2 rounded-lg text-sm font-medium
                text-slate-600 hover:bg-black/5
                dark:text-[#8B8D98] dark:hover:bg-white/5"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-4 py-2 rounded-lg text-sm font-medium
                bg-gradient-to-r from-[#7C5CFC] to-[#4F7FFF]
                text-white hover:brightness-110 transition"
              >
                Register
              </Link>
            </>
          )}

          <ThemeToggle />
        </div>

        {/* Mobile Header */}
        <div className="flex md:hidden items-center gap-3">

          <ThemeToggle />

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-3xl text-[#14151C] dark:text-white"
          >
            {menuOpen ? "✕" : "☰"}
          </button>

        </div>
      </div>

      {/* Mobile Menu */}
            {menuOpen && (
        <div
          className="absolute top-full left-0 right-0 z-40 md:hidden
          border-t bg-white dark:bg-[#0A0B10]
          dark:border-white/10 shadow-xl"
        >
          <div className="flex flex-col py-2">

            <button
              type="button"
              onClick={() => {
                closeMenu();
                navigate("/");
              }}
              className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-white/10"
            >
              🏠 Home
            </button>

            {currentUser && (
              <>
                <button
                  type="button"
                  onClick={() => {
                    closeMenu();
                    navigate("/create-blog");
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-white/10"
                >
                  ➕ New Post
                </button>

                <button
                  type="button"
                  onClick={() => {
                    closeMenu();
                    navigate("/saved");
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-white/10"
                >
                  🔖 Saved
                </button>

                <button
                  type="button"
                  onClick={() => {
                    closeMenu();
                    navigate("/profile");
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-white/10"
                >
                  👤 Profile
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-white/10"
                >
                  🚪 Logout
                </button>
              </>
            )}

            {!currentUser && (
              <>
                <button
                  type="button"
                  onClick={() => {
                    closeMenu();
                    navigate("/login");
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-white/10"
                >
                  Login
                </button>

                <button
                  type="button"
                  onClick={() => {
                    closeMenu();
                    navigate("/register");
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-white/10"
                >
                  Register
                </button>
              </>
            )}

          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;