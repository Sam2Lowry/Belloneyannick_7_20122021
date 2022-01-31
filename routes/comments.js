const express = require('express');
const {
	getComments,
	getCommentsByPost,
	createComment,
	deleteComment,
} = require('../controllers/comments');

const router = express.Router();
const { protect, authorize } = require('../middlewares/auth');

router.route('/').get(getComments, protect).post(createComment, protect);
router.route('/:id').delete(deleteComment, protect, authorize('admin'));
router.route('/post/:id').get(getCommentsByPost, protect);
module.exports = router;
