import mongoose from 'mongoose';
const { Schema } = mongoose;

const CommentSchema = new Schema({
    author: { type: String, required: true },
    body: { type: String, required: true },
    date: { type: String, required: true },
    forPost: { type: Schema.Types.ObjectId, required: true },
});

module.exports = mongoose.model('Comment', CommentSchema);
