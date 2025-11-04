const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const config = require('../utils/config')

const api = supertest(app)

let token
let userId

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = await new User({ username: 'root', passwordHash }).save()
  userId = user._id.toString()

  const userForToken = { username: user.username, id: user._id }
  token = jwt.sign(userForToken, config.SECRET)

  const initialBlogs = [
    { title: 'First Blog', author: 'Tester', url: 'https://first.com', likes: 5, user: userId },
    { title: 'Second Blog', author: 'Tester', url: 'https://second.com', likes: 3, user: userId }
  ]

  await Blog.insertMany(initialBlogs)
})

describe('when there are initially some blogs saved', () => {
  test('blogs are returned as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(2)
  })

  test('a valid blog can be added', async () => {
    const newBlog = { title: 'New Blog', author: 'Tester', url: 'https://new.com' }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(3)
  })

  test('defaults likes to 0 if missing', async () => {
    const newBlog = { title: 'No Likes', author: 'Tester', url: 'https://nolikes.com' }
    const res = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)

    expect(res.body.likes).toBe(0)
  })

  test('fails with 400 if title is missing', async () => {
    const newBlog = { author: 'Tester', url: 'https://notitle.com' }
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)
  })

  test('fails with 400 if url is missing', async () => {
    const newBlog = { title: 'No URL', author: 'Tester' }
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
