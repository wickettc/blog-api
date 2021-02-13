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

// get single post
exports.get_post = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'No post found' });
        res.status(200).json(post);
    } catch (err) {
        next(err);
    }
};

exports.create_post = async (req, res, next) => {
    try {
        const { title, author, message, time } = req.body;

        const newPost = new Post({
            title,
            author,
            message,
            time,
        });
        const post = await newPost.save();
        if (!post) {
            return res
                .status(404)
                .json({ message: 'Post could not be created' });
        }
        res.status(200).json(post);
    } catch (err) {
        next(err);
    }
};

exports.update_post = async (req, res, next) => {
    try {
        const { title, author, message, time } = req.body;

        const post = await Post.findByIdAndUpdate(
            req.params.id,
            {
                title,
                author,
                message,
                time,
            },
            // set option to return the updated post
            { new: true }
        );
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.status(200).json(post);
    } catch (err) {
        next(err);
    }
};

exports.delete_post = async (req, res, next) => {
    try {
        const post = await Post.findByIdAndRemove(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (err) {
        next(err);
    }
};
