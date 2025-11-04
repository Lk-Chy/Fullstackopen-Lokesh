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
})

describe('Blog creation with creator', () => {
  test('a valid blog can be added and is linked to user', async () => {
    const newBlog = { title: 'Creator Blog', author: 'Tester', url: 'https://creator.com' }

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.user).toBe(userId)
  })

  test('fails with 401 if token is missing', async () => {
    const newBlog = { title: 'No Token', author: 'Tester', url: 'https://notoken.com' }
    await api.post('/api/blogs').send(newBlog).expect(401)
  })
})

describe('Blog deletion by creator', () => {
  test('creator can delete their blog', async () => {
    const blogRes = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Delete Me', author: 'Tester', url: 'https://delete.com' })

    await api
      .delete(`/api/blogs/${blogRes.body.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)
  })

  test('non-creator cannot delete the blog', async () => {
    const blogRes = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Protected', author: 'Tester', url: 'https://protected.com' })

    const newUser = await new User({
      username: 'other',
      passwordHash: await bcrypt.hash('password', 10)
    }).save()

    const otherToken = jwt.sign({ username: newUser.username, id: newUser._id }, config.SECRET)

    await api
      .delete(`/api/blogs/${blogRes.body.id}`)
      .set('Authorization', `Bearer ${otherToken}`)
      .expect(401)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
