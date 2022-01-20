// Importation des modèles Comment de Prisma
const { PrismaClient } = require('@prisma/client');
const { comment } = new PrismaClient();

// @desc  GET ALL COMMENTS
// @route GET /api/v1/comments/
// @access Public
exports.getComments = async (req, res, next) => {
	try {
	} catch (err) {}
};

// @desc  GET A SINGLE COMMENT
// @route GET /api/v1/comments/:id
// @access Public
exports.getComment = async (req, res, next) => {
	try {
	} catch (err) {}
};

// @desc  CREATE A COMMENT
// @route POST /api/v1/comments/
// @access Public
exports.createComment = async (req, res, next) => {
	try {
	} catch (err) {}
};

// @desc  UPDATE A COMMENT
// @route PUT /api/v1/comments/:id
// @access Private (admin or user)
exports.updateComment = async (req, res, next) => {
	try {
	} catch (err) {}
};

// @desc  DELETE A COMMENT
// @route DELETE /api/v1/comments/:id
// @access Private (admin or user)
exports.deleteComment = async (req, res, next) => {
	try {
	} catch (err) {}
};
