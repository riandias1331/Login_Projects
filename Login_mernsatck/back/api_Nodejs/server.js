require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3333
const route = require('./route')
const mongoose = require('mongoose')


// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Route
app.use(route)

// Database
mongoose.connect(process.env.CONNECTION)
    .then(() => {
        console.log('Connected')
        app.emit('DataBase')
    })
    .catch((e) => console.log(e))

// Server 
app.on('DataBase', () => {
    app.listen(port, () => {
        console.log('server is running in: ', port)
        console.log('http://localhost:3333/users')
    })
})











