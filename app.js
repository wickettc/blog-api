const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();

const blogRouter = require('./routes/blog');
const AppError = require('./error_handling/AppError');
// const usersRouter = require('./routes/users');

const app = express();

const mongoDB = `mongodb+srv://admin:${process.env.MONGODB_PW}@cluster0.fefqf.mongodb.net/blog-api?retryWrites=true&w=majority`;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/blog', blogRouter);
// app.use('/users', usersRouter);

// error handler
app.use((err, req, res, next) => {
    const { status = 500, message = 'Something went wrong' } = err;
    res.status(status).json(message);
});

module.exports = app;
