const express = require('express');

const router = express.Router();

const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');

// GET blog posts
router.get('/posts', postController.get_all_posts);

// GET blog comments
router.get('/comments', commentController.get_all_comments);

// GET single post
router.get('/post/:id', postController.get_post);

// GET single comment
router.get('/comment/:id', commentController.get_comment);

// POST create a new post
router.post('/posts', postController.create_post);

// POST create a new comment
router.post('/comments', commentController.create_comment);

// PUT update post
router.put('/post/:id', postController.update_post);

// PUT update comment
router.put('/comment/:id', commentController.update_comment);

// DELETE single post
router.delete('/post/:id', postController.delete_post);

// DELETE single comment
router.delete('/comment/:id', commentController.delete_comment);

module.exports = router;
