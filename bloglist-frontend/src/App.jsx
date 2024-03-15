import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import {getAll, setToken, createBlog} from "./services/blogs";
import { login } from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({  title: "", url: "", author: ""});
  const [Message, setMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

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
 const handleLogout = ()=>{
  setUser(null)
  window.localStorage.removeItem("loggedNoteAppUser")
 }
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await login({
        username,
        password,
      });
      window.localStorage.setItem("loggedNoteAppUser", JSON.stringify(user));
      setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
      
    </form>
  );
  const createNewBlog = (e)=> {
    e.preventDefault();
    const blogObject = {
      title: newBlog.title,
      url: newBlog.url,
      author: newBlog.author
    }
    createBlog(blogObject)
      .then((json) => setBlogs((prevBlogs) => prevBlogs.concat(json)))
      .catch((err) => setMessage("note cant be created", err));
      setNewBlog({  title: "", url: "", author: ""});
      setMessage("new blog created");
  }
  const handleChangeTitle = (e) =>{
    setNewBlog({ ...newBlog, title: e.target.value })
  }
  const handleChangeUrl = (e) =>{
    setNewBlog({...newBlog ,url: e.target.value})
  }
  const handleChangeAuthor = (e) =>{
    setNewBlog({...newBlog, author: e.target.value,})
  }
  const blogForm = () => (
    <form onSubmit={createNewBlog}>
      title: <input value={newBlog.title}  onChange={handleChangeTitle} /> <br />
      url: <input value={newBlog.url} onChange={handleChangeUrl} /> <br />
      author: <input value={newBlog.author}  onChange={handleChangeAuthor} /> <br />
      <button type="submit">create</button>
    </form>
  );

  return (
    <div>
      <h2>blogs</h2>
      {Message}
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} logged-in</p>
          <button onClick={handleLogout}>logout</button>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
          {blogForm()}
        </div>
      )}
    </div>
  );
};

export default App;
