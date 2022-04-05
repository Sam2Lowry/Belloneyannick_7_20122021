// Importation des modèles Comment de Prisma
const { PrismaClient } = require('@prisma/client');
const { comment } = new PrismaClient();
const jwt = require('jsonwebtoken');
const asyncHandler = require('../middlewares/async');

// @desc  GET ALL COMMENTS BY POST
// @route GET /api/v1/comments/post/:id
// @access Public
exports.getCommentsByPost = async (req, res, next) => {
	try {
		const { id } = req.params;
		const comments = await comment.findMany({
			where: {
				post: {
					id: Number(id),
				},
			},
		});
		if (comments.length === 0) {
			return res.status(404).json('No comments found');
		}
		res.status(200).json(comments);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

// @desc  CREATE A COMMENT
// @route POST /api/v1/comments/
// @access Public
exports.createComment = asyncHandler(async (req, res, next) => {
	// Get the user id from the token
	token = req.headers.authorization.split(' ')[1];
	const { userId } = jwt.decode(token);
	console.log(userId);
	// Check if the user is logged in
	if (!userId) {
		return res.status(401).json('Unauthorized');
	}
	const { commentTxt, postId } = req.body;
	const newComment = await comment.create({
		data: {
			content: commentTxt,
			post: {
				connect: {
					id: Number(postId),
				},
			},
			user: {
				connect: {
					id: Number(userId),
				},
			},
		},
	});
	res.status(201).json('Comment created');
});

// @desc  DELETE A COMMENT
// @route DELETE /api/v1/comments/:id
// @access Private (admin or user)
exports.deleteComment = async (req, res, next) => {
	try {
		const { id } = req.params;

		// Get the user id from the token
		token = req.headers.authorization.split(' ')[1];
		const { userId, role } = jwt.decode(token);
		console.log(userId);

		const commentExist = await comment.findUnique({
			where: {
				id: Number(id),
			},
		});
		if (!commentExist) {
			return res.status(404).json('Comment not found');
		}
		// Make sure the user is the author of the comment or an admin
		if (userId === comment.author_id || role === 'admin') {
			return res.status(401).json('Unauthorized');
		}

		const deletedComment = await comment.delete({
			where: {
				id: Number(id),
			},
		});
		res.status(200).json(deletedComment);
	} catch (err) {
		res.status(500).json(err.message);
	}
};
