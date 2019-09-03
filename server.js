const db = require('./data/db')
const express = require('express')

const server = express()

server.use(express.json())

server.get('/', (req, res) => {
    res.status(200).json({ message: 'Success!' })
})

server.get('/api/posts', (req, res) => {
    db.find() 
        .then(result => res.status(201).json(result))
        .catch(error => res.status(500).json({ error: "The posts information could not be retrieved." }))
})

server.get('/api/posts/:id', (req, res) => {
    const id = req.params.id

    db.findById(id)
        .then(result => {
            console.log(result.length) // btw this console log is not working :(
            if (result.length >= 1) {
                res.status(201).json(result)
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
})

server.get('/api/posts/:id/comments', (req, res) => {
    const postId = req.params.id

    db.findById(postId)
        .then(posts => {
            if (posts.length >= 1) { 
                db.findPostComments(Number(postId))
                    .then(result => {
                        res.status(201).json(result)
                    })
                    .catch(error => {
                        res.status(500).json({ error: "The comments information could not be retrieved." })
                    })
                } else {
                    res.status(404).json({ message: "The post with the specified ID does not exist." })
                }
            })
            .catch(error => {
                console.log('Error occured -> ', error)
            })
})


module.exports = server