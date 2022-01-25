// Importation des modèles Comment de Prisma
const { PrismaClient } = require('@prisma/client');
const { comment } = new PrismaClient();

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

// @desc  GET ALL COMMENTS BY USER
// @route GET /api/v1/comments/user/:id
// @access Public
exports.getCommentsByUser = async (req, res, next) => {
	try {
		const { id } = req.params;
		const comments = await comment.findMany({
			where: {
				user: {
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

// @desc  GET A SINGLE COMMENT
// @route GET /api/v1/comments/:id
// @access Public
exports.getComment = async (req, res, next) => {
	try {
		const { id } = req.params;
		await comment.findUnique({
			where: {
				id: Number(id),
			},
		});
		if (!comment) {
			return res
				.status(404)
				.json({ success: false, error: 'No comment found' });
		}
		res.status(200).json({ success: true, data: comment });
	} catch (err) {
		res.status(500).json({ success: false, error: err.message });
	}
};

// @desc  CREATE A COMMENT
// @route POST /api/v1/comments/
// @access Public
exports.createComment = async (req, res, next) => {
	try {
		await comment.create({ data: req.body });
		res
			.status(201)
			.json({ success: true, data: { message: 'Comment created' } });
	} catch (err) {
		res.status(500).json({ success: false, error: err.message });
	}
};

// @desc  UPDATE A COMMENT
// @route PUT /api/v1/comments/:id
// @access Private (admin or user)
exports.updateComment = async (req, res, next) => {
	try {
		const { id } = req.params;
		const updateComment = await comment.update({
			where: {
				id: Number(id),
			},
			data: req.body,
		});
		res.status(200).json({ success: true, data: updateComment });
	} catch (err) {
		res.status(500).json({ success: false, error: err.message });
	}
};

// @desc  DELETE A COMMENT
// @route DELETE /api/v1/comments/:id
// @access Private (admin or user)
exports.deleteComment = async (req, res, next) => {
	try {
		const { id } = req.params;
		const deleteComment = await comment.delete({
			where: {
				id: Number(id),
			},
		});
		res.status(200).json({ success: true, data: deleteComment });
	} catch (err) {
		res.status(500).json({ success: false, error: err.message });
	}
};
