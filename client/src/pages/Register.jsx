import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      toast.error("All fields are required");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const response = await API.post("/auth/register", formData);

      toast.success(response.data.message || "Registration successful!");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);

      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "Registration failed");
      } else if (error.request) {
        toast.error("No response from server. Please try again.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <div
      className="min-h-screen relative flex items-center justify-center overflow-hidden px-4
      bg-[#F4F5FA] dark:bg-[#0A0B10] transition-colors duration-300"
    >
      {/* Ambient glow background (dark mode only) */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-[28rem] h-[28rem] rounded-full bg-[#7C5CFC]/0 dark:bg-[#7C5CFC]/25 blur-[110px] transition-colors duration-300" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 w-[28rem] h-[28rem] rounded-full bg-[#4F7FFF]/0 dark:bg-[#4F7FFF]/20 blur-[110px] transition-colors duration-300" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#00000006_1px,transparent_0)] dark:bg-[radial-gradient(circle_at_1px_1px,#ffffff08_1px,transparent_0)] bg-[size:24px_24px]" />

      {/* Gradient-bordered card */}
      <div
        className="relative z-10 w-full max-w-[380px] p-[1px] rounded-2xl
        bg-gradient-to-b from-[#7C5CFC]/30 via-black/5 to-transparent
        dark:from-[#7C5CFC]/50 dark:via-white/10 dark:to-transparent transition-colors duration-300"
      >
        <div
          className="rounded-2xl px-8 py-9 transition-colors duration-300
          bg-white shadow-[0_20px_60px_-20px_rgba(30,20,80,0.15)]
          dark:bg-[#12131A] dark:shadow-[0_0_60px_-15px_rgba(124,92,252,0.35)]"
        >
          <div className="mb-8">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#7C5CFC] to-[#4F7FFF] mb-5 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L4 6v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6l-8-4z"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-[#14151C] dark:text-white">
              Create your account
            </h1>
            <p className="text-sm mt-1.5 text-slate-500 dark:text-[#8B8D98]">
              Takes less than a minute.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <FloatingInput
              type="text"
              name="name"
              label="Full name"
              value={formData.name}
              onChange={handleChange}
            />

            <FloatingInput
              type="email"
              name="email"
              label="Email"
              value={formData.email}
              onChange={handleChange}
            />

            <FloatingInput
              type={showPassword ? "text" : "password"}
              name="password"
              label="Password"
              value={formData.password}
              onChange={handleChange}
              trailing={
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  tabIndex={-1}
                  className="text-slate-400 hover:text-slate-700 dark:text-[#8B8D98] dark:hover:text-white transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M3 3l18 18M10.6 10.7a2 2 0 002.7 2.7M6.6 6.7C4.5 8.1 3 10 3 10s3.5 6 9 6c1.6 0 3-.4 4.2-1.1M17.5 15.4C19.8 13.7 21 12 21 12s-3.5-6-9-6c-.6 0-1.2.06-1.8.17"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M3 12s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6z"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinejoin="round"
                      />
                      <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.6" />
                    </svg>
                  )}
                </button>
              }
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full mt-2 h-11 rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2 ${
                loading
                  ? "bg-slate-200 text-slate-400 dark:bg-white/5 dark:text-[#8B8D98] cursor-not-allowed"
                  : "bg-gradient-to-r from-[#7C5CFC] to-[#4F7FFF] text-white hover:brightness-110 active:brightness-95 shadow-[0_4px_20px_-4px_rgba(124,92,252,0.5)]"
              }`}
            >
              {loading && (
                <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
                  <path d="M21 12a9 9 0 00-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              )}
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="text-center text-sm mt-7 text-slate-500 dark:text-[#8B8D98]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#14151C] dark:text-white hover:text-[#7C5CFC] dark:hover:text-[#9E86FF] font-medium transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function FloatingInput({ type, name, label, value, onChange, trailing }) {
  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        id={name}
        placeholder=" "
        value={value}
        onChange={onChange}
        className="peer w-full h-12 rounded-lg px-3.5 pt-4 pb-1.5 text-sm outline-none transition-colors
          bg-black/[0.03] border border-black/10 text-[#14151C]
          focus:border-[#7C5CFC]/70 focus:bg-black/[0.02]
          dark:bg-white/[0.03] dark:border-white/10 dark:text-white
          dark:focus:border-[#7C5CFC]/70 dark:focus:bg-white/[0.05]
          placeholder-transparent [&:not(:placeholder-shown)]:pt-4"
      />
      <label
        htmlFor={name}
        className="absolute left-3.5 top-3.5 text-sm pointer-events-none transition-all
          text-slate-500 dark:text-[#8B8D98]
          peer-focus:top-1.5 peer-focus:text-[11px] peer-focus:text-[#7C5CFC] dark:peer-focus:text-[#9E86FF]
          peer-[&:not(:placeholder-shown)]:top-1.5 peer-[&:not(:placeholder-shown)]:text-[11px]"
      >
        {label}
      </label>
      {trailing && <div className="absolute right-3.5 top-1/2 -translate-y-1/2">{trailing}</div>}
    </div>
  );
}

export default Register;