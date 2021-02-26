const Comment = require('../models/comment');
const AppError = require('../utils/AppError');
const getCurrentTime = require('../utils/getCurrentTime');

exports.get_all_comments = async (req, res, next) => {
    try {
        const comments = await Comment.find({});
        if (!comments.length) throw new AppError('No comments found', 404);
        res.status(200).json(comments);
    } catch (err) {
        next(err);
    }
};

exports.get_comment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) throw new AppError('No Comment found', 404);
        res.status(200).json(comment);
    } catch (err) {
        next(err);
    }
};

exports.create_comment = async (req, res, next) => {
    try {
        const { author, commentbody, postId } = req.body;
        const time = getCurrentTime();
        const newComment = new Comment({
            author,
            commentbody,
            time,
            postId,
        });
        const comment = await newComment.save();
        if (!comment) throw new AppError('Comment could not be created', 404);
        res.status(201).json(comment);
    } catch (err) {
        next(err);
    }
};

exports.update_comment = async (req, res, next) => {
    try {
        const { commentbody, postId } = req.body;
        const time = getCurrentTime();
        const comment = await Comment.findByIdAndUpdate(
            req.params.id,
            {
                commentbody,
                time,
                postId,
            },
            { new: true }
        );
        if (!comment) throw new AppError('Could not update comment', 404);
        res.status(200).json(comment);
    } catch (err) {
        next(err);
    }
};

exports.delete_comment = async (req, res, next) => {
    try {
        const comment = await Comment.findByIdAndRemove(req.params.id);
        if (!comment) throw new AppError('Comment not found', 404);
        res.send(200).json(comment);
    } catch (err) {
        next(err);
    }
};
