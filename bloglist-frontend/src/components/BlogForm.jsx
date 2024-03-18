import { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: "", url: "", author: "" });

  const createNewBlog = (e) => {
    e.preventDefault();
    createBlog({
      title: newBlog.title,
      url: newBlog.url,
      author: newBlog.author,
      likes: 0,
    });

    setNewBlog({ title: "", url: "", author: "" });
  };
  const handleChangeTitle = (e) => {
    setNewBlog({ ...newBlog, title: e.target.value });
  };
  const handleChangeUrl = (e) => {
    setNewBlog({ ...newBlog, url: e.target.value });
  };
  const handleChangeAuthor = (e) => {
    setNewBlog({ ...newBlog, author: e.target.value });
  };

  return (
    <form onSubmit={createNewBlog}>
      title: <input value={newBlog.title} onChange={handleChangeTitle} /> <br />
      url: <input value={newBlog.url} onChange={handleChangeUrl} /> <br />
      author: <input
        value={newBlog.author}
        onChange={handleChangeAuthor}
      />
      <br />
      <button type="submit">create</button>
    </form>
  );
};

export default BlogForm;
