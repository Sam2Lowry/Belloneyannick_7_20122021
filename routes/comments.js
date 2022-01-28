const express = require('express');
const {
	getComments,
	getComment,
	getCommentsByPost,
	getCommentsByUser,
	createComment,
	updateComment,
	deleteComment,
} = require('../controllers/comments');

const router = express.Router();
const { protect, authorize } = require('../middlewares/auth');

router.route('/').get(getComments).post(createComment);
router
	.route('/:id')
	.get(getComment)
	.get(getCommentsByPost)
	.get(getCommentsByUser)
	.put(updateComment)
	.delete(deleteComment);

module.exports = router;
