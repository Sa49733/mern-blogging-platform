import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { user: currentUser, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav
      className="sticky top-0 z-20 border-b transition-colors duration-300
        bg-white/80 backdrop-blur-md border-black/5
        dark:bg-[#0A0B10]/80 dark:border-white/10"
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
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

        <div className="flex items-center gap-1 sm:gap-2.5">
          <Link
            to="/"
            className="hidden sm:inline-flex items-center h-9 px-3 rounded-lg text-sm font-medium transition-colors
              text-slate-600 hover:bg-black/5
              dark:text-[#8B8D98] dark:hover:bg-white/5"
          >
            Home
          </Link>

          {currentUser && (
            <>
              <Link
                to="/create-blog"
                className="hidden sm:inline-flex items-center h-9 px-4 rounded-lg text-sm font-medium
                  bg-gradient-to-r from-[#7C5CFC] to-[#4F7FFF] text-white
                  hover:brightness-110 active:brightness-95 transition-all
                  shadow-[0_4px_16px_-4px_rgba(124,92,252,0.5)]"
              >
                New Post
              </Link>

              <Link
                to="/saved"
                className="hidden sm:inline-flex items-center h-9 px-3 rounded-lg text-sm font-medium transition-colors
                  text-slate-600 hover:bg-black/5
                  dark:text-[#8B8D98] dark:hover:bg-white/5"
              >
                🔖 Saved
              </Link>

              <Link
                to="/profile"
                className="hidden sm:inline-flex items-center h-9 px-3 rounded-lg text-sm font-medium transition-colors
                  text-slate-600 hover:bg-black/5
                  dark:text-[#8B8D98] dark:hover:bg-white/5"
              >
                Profile
              </Link>
            </>
          )}

          {currentUser ? (
            <button
              type="button"
              onClick={handleLogout}
              className="h-9 px-3.5 rounded-lg text-sm font-medium transition-colors
                text-slate-600 hover:bg-black/5
                dark:text-[#8B8D98] dark:hover:bg-white/5"
            >
              Log out
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="h-9 px-3.5 rounded-lg text-sm font-medium transition-colors flex items-center
                  text-slate-600 hover:bg-black/5
                  dark:text-[#8B8D98] dark:hover:bg-white/5"
              >
                Sign in
              </Link>

              <Link
                to="/register"
                className="hidden sm:inline-flex items-center h-9 px-4 rounded-lg text-sm font-medium
                  bg-gradient-to-r from-[#7C5CFC] to-[#4F7FFF] text-white
                  hover:brightness-110 active:brightness-95 transition-all
                  shadow-[0_4px_16px_-4px_rgba(124,92,252,0.5)]"
              >
                Register
              </Link>
            </>
          )}

          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;