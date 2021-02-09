import mongoose from 'mongoose';
const { Schema } = mongoose;

const PostSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    body: { type: String, required: true },
    date: { type: String, required: true },
});

module.exports = mongoose.model('Post', PostSchema);
