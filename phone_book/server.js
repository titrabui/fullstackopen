const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(bodyParser.json())
app.use(cors())

const persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  }
]

const generateRandomId = () => {
  return Math.floor(Math.random() * Math.floor(1000000));
}

app.get('/info', (req, res) => {
  res.send(`<h1>Phonebook has info for ${persons.length} peoples</h1><h2>${new Date().toLocaleString()}</h2>`)
})

app.get('/persons', (req, res) => {
  res.json(persons)
})

app.post('/persons', (req, res) => {
  const person = { ...req.body, id: generateRandomId() }
  persons.push(person)
  res.json(person)
})

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
    
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
