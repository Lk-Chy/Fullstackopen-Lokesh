const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('sekret', 10)
  await new User({ username: 'root', passwordHash }).save()
})

describe('when there is initially one user in db', () => {
  test('all users are returned as JSON', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('creation succeeds with a fresh username', async () => {
    const newUser = { username: 'john', name: 'John Doe', password: 'mypassword' }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await api.get('/api/users')
    expect(usersAtEnd.body).toHaveLength(2)
  })

  test('creation fails if username is missing', async () => {
    const newUser = { name: 'NoName', password: 'mypassword' }
    await api.post('/api/users').send(newUser).expect(400)
  })

  test('creation fails if password is missing', async () => {
    const newUser = { username: 'nopass', name: 'NoPass' }
    await api.post('/api/users').send(newUser).expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
