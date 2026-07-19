import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

function CreateBlog() {
  const navigate = useNavigate();
  const { user: currentUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.content) {
      toast.error("Title and content are required");
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();

      data.append("title", formData.title);
      data.append("content", formData.content);

      if (image) {
        data.append("image", image);
      }

      const res = await API.post("/blogs", data, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Blog created successfully");
      navigate(`/blog/${res.data._id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F5FA] dark:bg-[#0A0B10] transition-colors duration-300">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="p-[1px] rounded-2xl bg-gradient-to-b from-[#7C5CFC]/30 via-black/5 to-transparent dark:from-[#7C5CFC]/50 dark:via-white/10 dark:to-transparent">
          <div className="rounded-2xl px-8 py-9 bg-white shadow-[0_20px_60px_-20px_rgba(30,20,80,0.15)] dark:bg-[#12131A] dark:shadow-[0_0_60px_-15px_rgba(124,92,252,0.35)]">
            <h1 className="text-2xl font-semibold tracking-tight text-[#14151C] dark:text-white mb-1">
              Write a new post
            </h1>

            <p className="text-sm text-slate-500 dark:text-[#8B8D98] mb-7">
              Share something with the community.
            </p>

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
                            <div>
                <label className="block mb-2 text-sm font-medium text-[#14151C] dark:text-white">
                  Cover Image
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm
                    file:mr-4 file:px-4 file:py-2
                    file:rounded-lg file:border-0
                    file:bg-[#7C5CFC] file:text-white
                    file:cursor-pointer
                    dark:text-white"
                />

                {image && (
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    className="mt-4 w-full h-60 object-cover rounded-xl"
                  />
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full h-11 rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2 ${
                  loading
                    ? "bg-slate-200 text-slate-400 dark:bg-white/5 dark:text-[#8B8D98] cursor-not-allowed"
                    : "bg-gradient-to-r from-[#7C5CFC] to-[#4F7FFF] text-white hover:brightness-110 active:brightness-95 shadow-[0_4px_20px_-4px_rgba(124,92,252,0.5)]"
                }`}
              >
                {loading ? "Publishing..." : "Publish post"}
              </button>
            </form>
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
          focus:border-[#7C5CFC]/70 focus:bg-black/[0.02]
          dark:bg-white/[0.03] dark:border-white/10 dark:text-white
          dark:focus:border-[#7C5CFC]/70 dark:focus:bg-white/[0.05]
          placeholder-transparent [&:not(:placeholder-shown)]:pt-4"
      />

      <label
        htmlFor={name}
        className="absolute left-3.5 top-3.5 text-sm pointer-events-none transition-all
          text-slate-500 dark:text-[#8B8D98]
          peer-focus:top-1.5 peer-focus:text-[11px] peer-focus:text-[#7C5CFC]
          dark:peer-focus:text-[#9E86FF]
          peer-[&:not(:placeholder-shown)]:top-1.5
          peer-[&:not(:placeholder-shown)]:text-[11px]"
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
          focus:border-[#7C5CFC]/70 focus:bg-black/[0.02]
          dark:bg-white/[0.03] dark:border-white/10 dark:text-white
          dark:focus:border-[#7C5CFC]/70 dark:focus:bg-white/[0.05]
          placeholder-transparent"
      />

      <label
        htmlFor={name}
        className="absolute left-3.5 top-2 text-[11px] pointer-events-none
          text-[#7C5CFC] dark:text-[#9E86FF]"
      >
        {label}
      </label>
    </div>
  );
}

export default CreateBlog;