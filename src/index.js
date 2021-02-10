import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import blogRouter from './routes/blog';

dotenv.config();
const app = express();

const mongoDB = `mongodb+srv://admin:${process.env.MONGODB_PW}@cluster0.fefqf.mongodb.net/blog-api?retryWrites=true&w=majority`;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use('/blog', blogRouter);

app.get('/blog', (req, res) => {
    return res.send('send posts');
});

app.post('/blog', (req, res) => {
    return res.send('send posts');
});

app.put('/blog', (req, res) => {
    return res.send('send posts');
});

app.delete('/blog', (req, res) => {
    return res.send('send posts');
});

app.listen(3000, () => console.log('server on port 3000'));
