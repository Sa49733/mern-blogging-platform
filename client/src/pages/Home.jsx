import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await API.get("/blogs");

        setBlogs(res.data.blogs);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div>
      <h1>All Blogs</h1>

      {blogs.map((blog) => (
        <div
          key={blog._id}
          style={{
            border: "1px solid black",
            padding: "10px",
            margin: "10px",
          }}
        >
          <Link to={`/blog/${blog._id}`}>
  <h2>{blog.title}</h2>
</Link>

          <p>{blog.content}</p>

          <small>
            Author: {blog.author.name}
          </small>
        </div>
      ))}
    </div>
  );
}

export default Home;