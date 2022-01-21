// Importation des modèles User de Prisma
const { PrismaClient } = require('@prisma/client');
const { user } = new PrismaClient();
const asyncHandler = require('../middlewares/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc  GET ALL USERS
// @route GET /api/v1/users/
// @access Public
exports.getUsers = async (req, res, next) => {
	try {
		const users = await user.findMany();
		res.status(200).json({ success: true, count: users.length, data: users });
	} catch (err) {
		res.status(500).json({ success: false, error: err.message });
	}
};

// @desc  GET A SINGLE USER
// @route GET /api/v1/users/:id
// @access Public
exports.getUser = asyncHandler(async (req, res, next) => {
	const { id } = req.params;
	const getUser = await user.findUnique({
		where: {
			id: Number(id),
		},
	});
	if (!getUser) {
		return next(
			new ErrorResponse(`user not found with ID ${req.params.id}`, 404)
		);
	} else {
		res.status(200).json({ success: true, data: getUser });
	}

	next(new ErrorResponse(`user not found with ID ${req.params.id}`, 404));
});

// @desc  CREATE A USER
// @route POST /api/v1/users/
// @access Public
exports.createUser = async (req, res, next) => {
	try {
		await user.create({ data: req.body });

		res.status(201).json({ success: true, data: { message: 'User created' } });
	} catch (err) {
		res.status(500).json({ success: false, error: err.code });
	}
};

// @desc  UPDATE A USER
// @route PUT /api/v1/users/:id
// @access Private (admin or user)
exports.updateUser = async (req, res, next) => {
	try {
		const { id } = req.params;
		await user.update({
			where: {
				id: Number(id),
			},
			data: req.body,
		});

		res.status(200).json({ success: true, data: { message: 'User updated' } });
	} catch (err) {
		res.status(404).json({ success: false, error: err.message });
	}
};

// @desc  DELETE A USER
// @route DELETE /api/v1/users/:id
// @access Private (admin or user)
exports.deleteUser = async (req, res, next) => {
	try {
		const { id } = req.params;
		await user.delete({
			where: {
				id: Number(id),
			},
		});
		res.status(200).json({ success: true, data: { message: 'User deleted' } });
	} catch (err) {
		res.status(400).json({ success: false, error: err.message });
	}
};
