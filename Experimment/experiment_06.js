const express = require('express')
const app = express()

app.use((req, res, next) => {
    console.log("Shri Request")
    next()
})

app.get('/', (req, res) => {
    res.send("<h1>Welcome Shri !!! </h1><a href='/about'>Go to About</a>")
})

app.get('/about', (req, res) => {
    res.send("<h1>About Page -</h1><a href='/'>Go to Home</a>")
})

app.listen(3000)