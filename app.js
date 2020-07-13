const express = require('express')
const path = require('path')
const { dirname } = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const {v4} = require('uuid')
const app = express()

app.use(cors())
app.use(bodyParser.json())

let CONTACTS = [
  {id: v4(), name: 'Elena', lastname: 'Mus', email: 'rqspopova@gmail.ru', marked: false}
]

app.get('/api/contacts', (req, res) => {
  res.status(200).json(CONTACTS)
})
app.post('/api/contacts', (req, res) => {
  const contact = {...req.body, id: v4(), marked: false}
  CONTACTS.push(contact)
  res.status(201).json(contact)
})
app.delete('/api/contacts/:id', (req, res) => {
  console.log(req)
  const index = CONTACTS.findIndex(i => i.id === req.params.id);
  CONTACTS = CONTACTS.splice(index,1)
  res.status(200).json({message: 'The contact has been deleted'})
})
app.put('/api/contacts/:id', (req, res) => {
  const index = CONTACTS.findIndex(i => i.id === req.params.id);
  CONTACTS[index] = req.body
  res.json(CONTACTS[index])
})

app.listen(3000, () => console.log('Server has been started'))