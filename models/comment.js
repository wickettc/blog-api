const mongoose = require('mongoose');

const { Schema } = mongoose;

const commentSchema = new Schema({
    // author: { type: Schema.Types.ObjectId, required: true },
    commentbody: { type: String, required: true },
    time: { type: String, required: true },
    postId: { type: Schema.Types.ObjectId, required: true },
});

module.exports = mongoose.model('Comment', commentSchema);
