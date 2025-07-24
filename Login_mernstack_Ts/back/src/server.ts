import dotenv from 'dotenv';
import express, { Express } from 'express';
import mongoose  from 'mongoose';
import cors from 'cors';
// import userRoutes from './routes/userRoutes';

dotenv.config();
const app: Express = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
// app.use(userRoutes)

// Database 
mongoose.connect(process.env.DATABASE_URL as string)
    .then(() => {
        console.log('Connected to MongoDB');
        app.emit("dataBase")
    })


// Server
app.on("DataBase", () => {
    app.listen(PORT, () => {
        console.log("Database is ready to use");
        console.log(`Server is running on port ${PORT}`);
    });
});