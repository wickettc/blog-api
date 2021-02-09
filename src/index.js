import express from 'express';

const app = express();

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
