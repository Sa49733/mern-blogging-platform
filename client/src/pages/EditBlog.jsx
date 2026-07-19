import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: currentUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const [fetching, setFetching] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await API.get(`/blogs/${id}`);

        setFormData({
          title: res.data.title,
          content: res.data.content,
        });
      } catch (error) {
        toast.error("Could not load this post");
      } finally {
        setFetching(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);

    try {
      await API.put(`/blogs/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });

      toast.success("Blog updated successfully");
      navigate(`/blog/${id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F5FA] dark:bg-[#0A0B10] transition-colors duration-300">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="p-[1px] rounded-2xl bg-gradient-to-b from-[#7C5CFC]/30 via-black/5 to-transparent dark:from-[#7C5CFC]/50 dark:via-white/10 dark:to-transparent">
          <div className="rounded-2xl px-8 py-9 bg-white shadow-[0_20px_60px_-20px_rgba(30,20,80,0.15)] dark:bg-[#12131A] dark:shadow-[0_0_60px_-15px_rgba(124,92,252,0.35)]">
            <h1 className="text-2xl font-semibold tracking-tight text-[#14151C] dark:text-white mb-1">
              Edit post
            </h1>
            <p className="text-sm text-slate-500 dark:text-[#8B8D98] mb-7">
              Update your title or content below.
            </p>

            {fetching ? (
              <div className="space-y-4">
                <div className="h-12 rounded-lg animate-pulse bg-black/[0.03] dark:bg-white/[0.03]" />
                <div className="h-48 rounded-lg animate-pulse bg-black/[0.03] dark:bg-white/[0.03]" />
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <FloatingInput
                  type="text"
                  name="title"
                  label="Title"
                  value={formData.title}
                  onChange={handleChange}
                />

                <FloatingTextarea
                  name="content"
                  label="Content"
                  value={formData.content}
                  onChange={handleChange}
                  rows={10}
                />

                <button
                  type="submit"
                  disabled={saving}
                  className={`w-full h-11 rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2 ${
                    saving
                      ? "bg-slate-200 text-slate-400 dark:bg-white/5 dark:text-[#8B8D98] cursor-not-allowed"
                      : "bg-gradient-to-r from-[#F0B429] to-[#F0742A] text-white hover:brightness-110 active:brightness-95 shadow-[0_4px_20px_-4px_rgba(240,116,42,0.45)]"
                  }`}
                >
                  {saving ? "Saving..." : "Save changes"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function FloatingInput({ type, name, label, value, onChange }) {
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
          focus:border-[#F0742A]/70 focus:bg-black/[0.02]
          dark:bg-white/[0.03] dark:border-white/10 dark:text-white
          dark:focus:border-[#F0742A]/70 dark:focus:bg-white/[0.05]
          placeholder-transparent [&:not(:placeholder-shown)]:pt-4"
      />
      <label
        htmlFor={name}
        className="absolute left-3.5 top-3.5 text-sm pointer-events-none transition-all
          text-slate-500 dark:text-[#8B8D98]
          peer-focus:top-1.5 peer-focus:text-[11px] peer-focus:text-[#F0742A]
          peer-[&:not(:placeholder-shown)]:top-1.5 peer-[&:not(:placeholder-shown)]:text-[11px]"
      >
        {label}
      </label>
    </div>
  );
}

function FloatingTextarea({ name, label, value, onChange, rows }) {
  return (
    <div className="relative">
      <textarea
        name={name}
        id={name}
        placeholder=" "
        value={value}
        onChange={onChange}
        rows={rows}
        className="peer w-full rounded-lg px-3.5 pt-6 pb-2.5 text-sm outline-none transition-colors resize-y leading-6
          bg-black/[0.03] border border-black/10 text-[#14151C]
          focus:border-[#F0742A]/70 focus:bg-black/[0.02]
          dark:bg-white/[0.03] dark:border-white/10 dark:text-white
          dark:focus:border-[#F0742A]/70 dark:focus:bg-white/[0.05]
          placeholder-transparent"
      />
      <label
        htmlFor={name}
        className="absolute left-3.5 top-2 text-[11px] pointer-events-none transition-all
          text-[#F0742A] dark:text-[#F5A05C]"
      >
        {label}
      </label>
    </div>
  );
}

export default EditBlog;