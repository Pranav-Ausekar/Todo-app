import express from "express";
import authRoute from './routes/auth.js'
import todoRoute from './routes/todo.js'
// dotenv: to use environmental 'env' variables
import dotenv from 'dotenv'
// bodyParser: to parse the data comming from user/postman
import bodyParser from 'body-parser'
// cookieParser: to parse the cookie-data that is comming with each request of user
import cookieParser from 'cookie-parser'
import cors from "cors";


const corsOptions = {
    origin: "http://localhost:5173", // to allow access from this localhost
    credentials: true  // to pass cookies from backend to frontend
}

const app = express()
// const PORT = 3000;

dotenv.config() // to read the values from .env file
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser())
app.use('/api/user', authRoute)
app.use('/api/todos', todoRoute)


app.get('/', (req, res, next) => {
    res.send("You are on Home page");
})


// global error handler
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";

    res.status(statusCode).json({ error: message })
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})