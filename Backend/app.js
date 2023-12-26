const express = require('express');
const app = express();
const errorMiddleware = require('./middleware/Error');
const cookieParser = require('cookie-parser');
const bodyparser = require('body-parser');
const fileUpload = require('express-fileupload');

// to read json in express 
app.use(express.json());

// to access cookies 
app.use(cookieParser());

//to access images and parse 
app.use(bodyparser.urlencoded({ extended: true }));
app.use(fileUpload());

// using routes
const book = require('./routes/BookRoute');
app.use("/api/v1", book);

const user = require('./routes/UserRoute');
app.use("/api/v1", user);

const order = require('./routes/OrderRoute');
app.use("/api/v1", order);

// middleware for error 
app.use(errorMiddleware);

module.exports = app;