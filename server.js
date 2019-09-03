const db = require('./data/db')
const express = require('express')

const server = express()

server.use(express.json())

server.get('/', (req, res) => {
    res.status(200).json({ message: 'Success!' })
})

module.exports = server