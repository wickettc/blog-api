const express = require('express');

const router = express.Router();

const postController = require('../controllers/postController');

// GET blog posts
router.get('/posts', postController.get_all_posts);

// // POST new post
// router.post('/posts', postController.create_post);

// GET single post
router.get('/post/:id', postController.get_post);

// PUT update post
router.put('/post/:id', postController.update_post);

module.exports = router;
