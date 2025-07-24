require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3333
const route = require('./routes')
const mongoose = require('mongoose')
const cors = require('cors')


// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// Route
app.use( "/api", route)

// Database
mongoose.connect(process.env.DATABASE_URL)
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











