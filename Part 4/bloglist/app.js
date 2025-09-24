const express = require('express')
require('express-async-errors')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const blogRoutes = require('./routes/blogRoutes')
const userRoutes = require('./routes/userRoutes')
const { log, error } = require('./utils/loggers')

const app = express()

mongoose.connect(process.env.MONGODB_URI)
  .then(() => log('Connected to MongoDB'))
  .catch(err => error('MongoDB connection error', err))

app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
  log(`${req.method} ${req.path} - Body:`, req.body)
  next()
})

app.use('/api/blogs', blogRoutes)
app.use('/api/users', userRoutes)

app.use((req, res) => {
  res.status(404).send({ error: 'Unknown endpoint' })
})

app.use((err, req, res, next) => {
  error(err.message)
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message })
  } else if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'Invalid token' })
  }
  res.status(500).json({ error: 'Internal server error' })
})

module.exports = app
