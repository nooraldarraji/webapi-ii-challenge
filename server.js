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

server.post('/api/posts', (req, res) => {

    ject = req.body;

    if (postObject.contents && postObject.title) {
       db.insert(postObject)
           .then(result => {
               db.findById(result.id)
                   .then(result => {
                       res.status(201).json(result)
                   })
                   .catch(error => {
                       console.log('Error occured -> ', error)
            })
           })
           .catch(error => {
               res.status(500).json({ error: "There was an error while saving the post to the database" })
           })
   } else {
       res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
   }
})

server.delete('/api/posts/:id', (req, res) => {

    const postId = req.params.id;

     db.findById(postId) 
        .then(result => {
            const postDelete = result 
            if(result.length >= 1) {
                db.remove(postId)
                    .then(results => {
                        res.status(200).json(postDelete)
                    })
                    .catch(err => {
                        res.status(500).json({ error: "The post could not be removed" })
                    })
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(error => {
            console.log(error)
        })
})

server.put('/api/posts/:id', (req, res) => {
    
    const postId = req.params.id;
    const postUpdate = req.body;

     db.findById(postId) 
        .then(result => {
            if (result.length >= 1) {

                 if (postUpdate.title && postUpdate.contents) {
                    db.update(postId, postUpdate)
                        .then(results => {

                            db.findById(postId) 
                                .then(result => {
                                    res.status(200).json(result)
                                })
                                .catch(err => {
                                    console.log(err)
                                })
                        })
                        .catch(err => {
                            res.status(500).json({ error: "The post information could not be modified." })
                        })
                } else {
                    res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
                }

             } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
})

module.exports = server