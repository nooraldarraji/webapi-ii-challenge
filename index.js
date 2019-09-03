const server = require('./server.js');

const port = 6000;

server.listen(port, () => {
    console.log(`API is listening on port ${port}`)
})