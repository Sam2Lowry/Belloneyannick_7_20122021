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
const { protect, authorize } = require('../middlewares/auth');

router.route('/').get(getPosts, protect).post(createPost, protect);
router
	.route('/:id')
	.get(getPost, protect)
	.put(updatePost, protect, authorize('admin'))
	.delete(deletePost, protect, authorize('admin'));
router.route('/all/:id').get(getAllPosts, protect);

module.exports = router;
