const express = require('express');
const {
	getComments,
	getComment,
	getCommentsByPost,
	createComment,
	deleteComment,
} = require('../controllers/comments');

const router = express.Router();
const { protect, authorize } = require('../middlewares/auth');

router.route('/').get(getComments).post(createComment);
router
	.route('/:id')
	.get(getComment)
	.get(getCommentsByPost)
	.delete(deleteComment);

module.exports = router;
