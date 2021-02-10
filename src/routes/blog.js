import express from 'express';
import blogController from '../controllers/blogController';

const router = express.Router();

router.get('/', blogController.index);

router.get('/new', blogController.create_post);
