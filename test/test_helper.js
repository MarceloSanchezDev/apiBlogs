const Blog = require('../models/Blog')

const initialBlogs = [
    {
        title : 'HTML is easy',
        author: 'Marcelo sanchez',
        url: 'http://www.marcelosanchez.com',
        likes:  2
    },
    {
        title : 'HTML is bad',
        author: 'Marcelo sanchez',
        url: 'http://www.marcelosanchez.com',
        likes:  3
    }
  ]

  const nonExistingId = async () => {
    const blogs = new Note({ content: 'willremovethissoon' })
    await blogs.save()
    await blogs.deleteOne()
  
    return blogs._id.toString()
  }
  
  const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
  }

module.exports = {
    initialBlogs,
    nonExistingId,
    blogsInDb
}