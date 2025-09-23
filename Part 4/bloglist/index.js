const mongoose = require('mongoose')
const app = require('./app')
const { PORT, MONGODB_URI} = require('./utils/config')
const {info, error} = require('./utils/loggers')

mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true} ).then(()=>{
    info('Connected to MongoDB')
    app.listen(PORT, ()=>{
        info(`Server running on port ${PORT}`)
    })
})
.catch((err)=>{
    error('Error connecting to MongoDB:', err.message)
})