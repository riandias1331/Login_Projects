import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import pool from './config/db.js'
import userRoutes from './routes/routes.js'
import createUserTable from './data/createUserTable.js'
import errorHandler from './middlewares/errorHandler.js'

dotenv.config()
const app = express()
const port = process.env.PORT || 5002

// Middlewrare
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Routes
app.use(userRoutes)

// Error Handler
app.use(errorHandler)

// Database
createUserTable()

// Testing Database
app.get('/', async(req, res) => {
    const result = await pool.query("SELECT current_database()")
    res.send(`The database name is : ${result.rows[0].current_database}`)
})

// Server
app.listen(port, () => {
    console.log('Server is running')
})