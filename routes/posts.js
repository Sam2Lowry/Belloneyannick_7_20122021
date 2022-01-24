const express = require('express');
const {
	getPosts,
	getPost,
	createPost,
	updatePost,
	deletePost,
	getAllPosts,
} = require('../controllers/posts');

const router = express.Router();
const { protect } = require('../middlewares/auth');

router.route('/').get(getPosts).post(createPost);
router.route('/:id').get(getPost).put(updatePost).delete(deletePost);
router.route('/all/:id').get(getAllPosts);

module.exports = router;
