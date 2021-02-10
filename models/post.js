const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, required: true },
    message: { type: String, required: true },
    time: { type: String, required: true },
});

module.exports = mongoose.model('Post', postSchema);
