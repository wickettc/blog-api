const express = require('express');

const router = express.Router();

const postController = require('../controllers/postController');

// GET blog posts
router.get('/posts', postController.get_all_posts);

// GET single post
router.get('/post/:id', postController.get_post);

// POST create a new post
router.post('/posts', postController.create_post);

// PUT update post
router.put('/post/:id', postController.update_post);

// DELETE single post
router.delete('/post/:id', postController.delete_post);

module.exports = router;
