// Importation des modèles Comment de Prisma
const { PrismaClient } = require('@prisma/client');
const { comment } = new PrismaClient();

// @desc  GET ALL COMMENTS
// @route GET /api/v1/comments/
// @access Public
exports.getComments = (req, res, next) => {
	res.status(200).json({ success: true, message: 'bring all the comments !!' });
};

// @desc  GET A SINGLE COMMENT
// @route GET /api/v1/comments/:id
// @access Public
exports.getComment = (req, res, next) => {
	res
		.status(200)
		.json({ success: true, message: `Display comment ${req.params.id}` });
};

// @desc  CREATE A COMMENT
// @route POST /api/v1/comments/
// @access Public
exports.createComment = (req, res, next) => {
	res.status(200).json({ success: true, message: 'Create a comment' });
};

// @desc  UPDATE A COMMENT
// @route PUT /api/v1/comments/:id
// @access Private (admin or user)
exports.updateComment = (req, res, next) => {
	res
		.status(200)
		.json({ success: true, message: `update comment ${req.params.id}` });
};

// @desc  DELETE A COMMENT
// @route DELETE /api/v1/comments/:id
// @access Private (admin or user)
exports.deleteComment = (req, res, next) => {
	res
		.status(200)
		.json({ success: true, message: 'delete an comment, mouhahaha !!' });
};
