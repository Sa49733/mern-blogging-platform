import { useState } from "react";
import API from "../services/api";

function CreateBlog() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      await API.post(
        "/blogs",
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      alert("Blog Created Successfully");

      setFormData({
        title: "",
        content: "",
      });
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  return (
    <div>
      <h1>Create Blog</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Blog Title"
          value={formData.title}
          onChange={handleChange}
        />

        <br /><br />

        <textarea
          name="content"
          placeholder="Blog Content"
          value={formData.content}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          Create Blog
        </button>
      </form>
    </div>
  );
}

export default CreateBlog;