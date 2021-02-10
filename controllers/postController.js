const Post = require('../models/post');

exports.get_all_posts = async (req, res, next) => {
    try {
        const posts = await Post.find({});
        if (!posts) return res.status(404).json({ message: 'No posts found' });
        res.status(200).json(posts);
    } catch (err) {
        next(err);
    }
};

exports.get_post = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'No post found' });
        res.status(200).json(post);
    } catch (err) {
        next(err);
    }
};
