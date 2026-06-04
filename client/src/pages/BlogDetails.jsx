import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function BlogDetails() {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  const fetchData = async () => {
    try {
      const blogRes = await API.get(`/blogs/${id}`);
      setBlog(blogRes.data);

      const commentRes = await API.get(`/comments/${id}`);
      setComments(commentRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const addComment = async (e) => {
    e.preventDefault();

    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      await API.post(
        `/comments/${id}`,
        { text },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setText("");

      fetchData();

      alert("Comment Added");
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  if (!blog) return <h2>Loading...</h2>;

  return (
    <div>
      <h1>{blog.title}</h1>

      <p>{blog.content}</p>

      <h4>Author: {blog.author.name}</h4>

      <hr />

      <h2>Add Comment</h2>

      <form onSubmit={addComment}>
        <input
          type="text"
          placeholder="Write a comment"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button type="submit">
          Add Comment
        </button>
      </form>

      <hr />

      <h2>Comments</h2>

      {comments.length === 0 ? (
        <p>No comments yet</p>
      ) : (
        comments.map((comment) => (
          <div key={comment._id}>
            <strong>{comment.user.name}</strong>

            <p>{comment.text}</p>

            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default BlogDetails;