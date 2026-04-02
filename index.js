const dotenv = require('dotenv').config();
const  {db}= require('./db');
const express = require('express');

const book_router = require('./routes/books.routes');
const loggermiddleware = require('./middlewares/loggerMiddlewares');

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(loggermiddleware);
console.log(book_router);
app.use('/books',book_router);

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})