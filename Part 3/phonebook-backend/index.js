const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(express.json());

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method);
  console.log('Path:  ', request.path);
  console.log('Body:  ', request.body);
  console.log('---');
  next();
};
app.use(requestLogger);

let persons = [
  { id: '1', name: 'Arto Hellas', number: '040-123456' },
  { id: '2', name: 'Ada Lovelace', number: '39-44-5323523' },
  { id: '3', name: 'Dan Abramov', number: '12-43-234345' },
  { id: '4', name: 'Mary Poppendieck', number: '39-23-6423122' }
];

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/info', (req, res) => {
  const count = persons.length;
  const timestamp = new Date();
  res.send(`
    <p>Phonebook has info for ${count} people</p>
    <p>${timestamp}</p>
  `);
});

app.get('/api/persons/:id', (req, res) => {
  const id = String(req.params.id);
  const person = persons.find(p => p.id === id);
  if (!person) {
    return res.status(404).end();
  }
  res.json(person);
});

app.delete('/api/persons/:id', (req, res) => {
  const id = String(req.params.id);
  const before = persons.length;
  persons = persons.filter(p => p.id !== id);

  if (persons.length === before) {
    return res.status(404).json({ error: 'person not found' });
  }
  res.status(204).end();
});

const genId = () => String(Math.floor(100000 + Math.random() * 900000));

app.post('/api/persons', (req, res) => {
  const { name, number } = req.body || {};

  if (!name || !number) {
    return res.status(400).json({ error: 'name and number are required' });
  }

  const normalizedName = name.trim().toLowerCase();
  const exists = persons.some(p => p.name.trim().toLowerCase() === normalizedName);
  if (exists) {
    return res.status(400).json({ error: 'name must be unique' });
  }

  const newPerson = {
    id: genId(),
    name: name.trim(),
    number: number.trim()
  };

  persons.push(newPerson);
  res.status(201).json(newPerson);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};
app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
