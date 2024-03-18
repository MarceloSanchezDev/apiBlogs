import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import { getAll, setToken, createBlog } from "./services/blogs";
import { login } from "./services/login";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [Message, setMessage] = useState(null);
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    getAll().then((blogs) => setBlogs(blogs));
  }, []);
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      setToken(user.token);
    }
  }, []);
  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedNoteAppUser");
  };
  const handleLogin = async (credentials) => {
    try {
      const user = await login(credentials);
      window.localStorage.setItem("loggedNoteAppUser", JSON.stringify(user));
      setToken(user.token);
      setUser(user);
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };
  const loginForm = () => (
    <Togglable buttonLabel="Login">
      <LoginForm userLogin={handleLogin}/>
    </Togglable>
  );

  const createNewBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    createBlog(blogObject)
      .then((json) => setBlogs((prevBlogs) => prevBlogs.concat(json)))
      .catch((err) => setMessage("note cant be created", err));
    setMessage("new blog created");
  };

  const blogForm = () => (
    <Togglable buttonLabel="new Blog" ref={blogFormRef}>
      <BlogForm createBlog={createNewBlog} />
    </Togglable>
  );

  return (
    <div>
      <h2>blogs</h2>
      {Message}
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} logged-in <button onClick={handleLogout}>logout</button></p>
          {blogForm()}
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog}/>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
