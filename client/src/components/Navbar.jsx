import { Link } from "react-router-dom";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <nav>
      <Link to="/">Home</Link>

      {" | "}

      {user ? (
        <>
          <Link to="/create-blog">Create Blog</Link>

          {" | "}

          <button onClick={logout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>

          {" | "}

          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;