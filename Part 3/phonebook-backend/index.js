require('dotenv').config()
const express = require('express')
const app = express()
const Phone = require('./models/phone')
const morgan = require('morgan')
app.use(express.static('dist'))
app.use(express.json())
let persons = [
  {
    id: '1',
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: '2',
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: '3',
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: '4',
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
]

morgan.token('body-req', (req) => JSON.stringify(req.body))
app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
      tokens['body-req'](req, res),
    ].join(' ')
  })
)

app.get('/api/persons', (request, response, next) => {
  Phone.find({})
    .then((result) => {
      response.json(result)
      result.forEach((phone) => {
        console.log(phone)
      })
    })
    .catch((error) => {
      next(error)
    })
})

app.get('/api/info', (request, response) => {
  const date = new Date()
  Phone.find({}).then((result) => {
    response.send(
      `Phonebook has info for ${
        Object.keys(result).length
      } people <br/> <br/> ${date.toString()}`
    )
  })

})

app.get('/api/persons/:id', (request, response, next) => {
  const idd = request.params.id
  Phone.findById(idd)
    .then((phone) => {
      if (phone) {
        response.json(phone)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => {
      next(error)
    })
})

app.delete('/api/persons/:id', (request, response, next) => {
  const idd = request.params.id
  Phone.findByIdAndDelete(idd)
    .then((result) => {
      response.status(204).end(result)
    })
    .catch((error) => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  if (!body.number) {
    return response.status(400).json({
      error: 'number missing',
    })
  }
  for (let person of persons) {
    if (person.name === body.name) {
      return response.status(400).json({
        error: 'name already exist',
      })
    }
  }

  const NewPerson = new Phone({
    name: body.name,
    number: body.number,
  })
  NewPerson.save().then((savedPhone) => {
    response.json(savedPhone)
  }).catch(error => {
    next(error)
  })
})

app.delete('/api/persons/:id', (request, response, next) => {
  const idd = request.params.id
  Phone.findByIdAndDelete(idd)
    .then((result ) => {
      response.status(204).end(result)
    })
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  const { name, number } = req.body
  Phone.findByIdAndUpdate(
    id,
    { name, number }
  )
    .then((updatedPhone) => {
      if (!updatedPhone) {
        return res.status(404).json({ error: 'Phone not found' })
      }
      res.json(updatedPhone)
    })
    .catch((error) => {
      next(error)
    })
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}
app.use(unknownEndpoint)
app.use(errorHandler)
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})