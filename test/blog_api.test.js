const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')

const Blog = require('../models/Blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  describe('when there is initially some blogs saved', () => {
    test('blogs are returned as json', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })
  
    test('all blogs are returned', async () => {
      const response = await api.get('/api/blogs')
  
      expect(response.body).toHaveLength(helper.initialBlogs.length)
    })
  
    test('a specific blog is within the returned blogs', async () => {
      const response = await api.get('/api/blogs')
  
      const titles = response.body.map(r => r.title)
  
      expect(titles).toContain(
        'HTML is easy'
      )
    })
  })

  describe('addition of a new blog', () => {
    test('succeeds with valid data', async () => {
      const newBlog = {
        title: 'async/await simplifies making async calls',
        author: 'Pedro Sanchez',
        url : 'localhost:3131',
        likes : 5 
      }
  
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
  
      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  
      const titles = blogsAtEnd.map(n => n.title)
      expect(titles).toContain(
        'async/await simplifies making async calls'
      )
    })

  })
  describe('deletion of a blog', () =>{
    test('succeeds with status code 204 if id is valid', async ()=>{
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = await blogsAtStart[0]
    
        await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)
        
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length -1)

        const titles = blogsAtEnd.map(r => r.title)
        expect(titles).not.toContain(blogToDelete.title)
        
    })
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })