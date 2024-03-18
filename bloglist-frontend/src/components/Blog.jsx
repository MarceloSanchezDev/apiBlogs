import { useState } from "react";
import { likedBlog, deleteBlog } from "../services/blogs";


const Blog = ({ blog }) => {
  const [show, setShow] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleShow = () => {
    setShow(!show);
  };

  const handleLike = async () => {
    try{
      const updatedLikes = likes + 1;
        setLikes(updatedLikes);
  
      await likedBlog({ ...blog, likes: updatedLikes }, blog.id);
    }catch{
      console.error('Error al dar like:', error)
    }

  }
  const handleDelete = () => {
    if(window.confirm(`do you detele the blog : ${blog.title} ? `)){
      console.log('delete')
    }
    try{
      deleteBlog(blog.id)
    }catch{
      console.error("ERROR al borrar:", error)
    }
  }

  return (
    <div style={blogStyle}>
      <h3>{blog.title}</h3>
      <div>
        {show ? (
          <div>
            <ul>
              <ol>author: {blog.author}</ol>
              <ol>url: {blog.url}</ol>
              <ol>likes: {likes}<button onClick={handleLike}>like</button></ol>
            </ul>
            <button onClick={handleShow}>hide</button>
          </div>
        ) : (
          <button onClick={handleShow}>view</button>
        )}
      </div>
      <button onClick={handleDelete}>delete</button>
    </div>
  );
};

export default Blog;
