const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const compression = require('compression');
const helmet = require('helmet');
require('dotenv').config();

require('./passport/passport');
const blogRouter = require('./routes/blog');
const authRouter = require('./routes/auth');

const app = express();

const devDbUrl = `mongodb+srv://admin:${process.env.MONGODB_PW}@cluster0.fefqf.mongodb.net/blog-api?retryWrites=true&w=majority`;
const mongoDB = process.env.MONGODB_URI || devDbUrl;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(compression());
app.use(helmet());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/blog', blogRouter);
app.use('/auth', authRouter);

// error handler
app.use((err, req, res, next) => {
    const { status = 500, message = 'Something went wrong' } = err;
    res.status(status).json(message);
});

module.exports = app;
