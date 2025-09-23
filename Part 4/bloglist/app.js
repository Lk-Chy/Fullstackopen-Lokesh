const express = require('express')
const blogRoutes = require('./routes/blogRoutes')
const { requestLogger, unknownEndpoint, errorHandler} = require('./middleware/logger')


const app = express()

app.use(express.json())
app.use(requestLogger)
app.use('/api/blogs',blogRoutes)
app.use(unknownEndpoint)
app.use(errorHandler)


module.exports = app