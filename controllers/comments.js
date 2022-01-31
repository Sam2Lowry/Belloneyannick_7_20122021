// Importation des modèles Comment de Prisma
const { PrismaClient } = require('@prisma/client');
const { comment } = new PrismaClient();
const jwt = require('jsonwebtoken');

// @desc  GET ALL COMMENTS
// @route GET /api/v1/comments/
// @access Public
exports.getComments = async (req, res, next) => {
	try {
		const comments = await comment.findMany();
		res
			.status(200)
			.json({ success: true, count: comments.length, data: comments });
		if (comments.length === 0) {
			return res
				.status(404)
				.json({ success: false, error: 'No comments found' });
		}
	} catch (err) {
		res.status(500).json({ success: false, error: err.message });
	}
};

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
			return res
				.status(404)
				.json({ success: false, error: 'No comments found' });
		}
		res
			.status(200)
			.json({ success: true, count: comments.length, data: comments });
	} catch (err) {
		res.status(500).json({ success: false, error: err.message });
	}
};

// @desc  CREATE A COMMENT
// @route POST /api/v1/comments/
// @access Public
exports.createComment = async (req, res, next) => {
	try {
		const { userId } = jwt.decode(req.cookies.token);
		console.log(userId);
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
		res
			.status(201)
			.json({ success: true, data: { message: 'Comment created' } });
	} catch (err) {
		console.log(err);
		res.status(500).json({ success: false, error: err.message });
	}
};

// @desc  DELETE A COMMENT
// @route DELETE /api/v1/comments/:id
// @access Private (admin or user)
exports.deleteComment = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { userId, role } = jwt.decode(req.cookies.token);
		const post = await comment.findUnique({
			where: {
				id: Number(id),
			},
		});
		if (!post) {
			return res
				.status(404)
				.json({ success: false, error: 'Comment not found' });
		}
		// Make sure the user is the author of the post or an admin
		if (userId !== post.author_id && role !== 'admin') {
			return res.status(401).json({ success: false, error: 'Unauthorized' });
		}

		const deletedComment = await comment.delete({
			where: {
				id: Number(id),
			},
		});
		res.status(200).json({ success: true, data: deletedComment });
	} catch (err) {
		res.status(500).json({ success: false, error: err.message });
	}
};
