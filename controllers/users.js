// Importation des modèles User de Prisma
const { PrismaClient } = require('@prisma/client');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { user } = new PrismaClient();

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
exports.getUser = async (req, res, next) => {
	try {
		const { id } = req.params;
		const getUser = await user.findUnique({
			where: {
				id: Number(id),
			},
		});
		if (!getUser) {
			return res.status(400).json({ success: false, error: 'User not found' });
		} else {
			res.status(200).json({ success: true, data: getUser });
		}
	} catch (err) {
		res.status(500).json({ success: false, error: err.message });
	}
};

// @desc  UPDATE A USER
// @route PUT /api/v1/users/:id
// @access Private (admin or user)
exports.updateUser = async (req, res, next) => {
	try {
		const { id } = req.params;
		const user = await user.findUnique({
			where: {
				id: Number(id),
			},
		});
		if (!user) {
			return res.status(404).json({ success: false, error: 'user not found' });
		}
		// Check if user is admin or user is updating his own profile
		if (user.id.toString() !== req.user.id && req.user.role !== 'admin') {
			return res.status(401).json({ success: false, error: 'Unauthorized' });
		}
		const updateUser = await user.update({
			data: {
				...req.body,
			},
			where: {
				id: Number(id),
			},
		});
		res.status(200).json({ success: true, data: updateUser });
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
		const { userId, role } = jwt.decode(req.cookies.token);
		if (role === 'admin' || userId === parseInt(req.params.id)) {
			await user.delete({
				where: {
					id: Number(id),
				},
			});
			return res
				.status(200)
				.json({ success: true, data: { message: 'User deleted' } });
		} else
			return res.status(401).json({ success: false, error: 'Unauthorized' });
	} catch (err) {
		res.status(500).json({ success: false, error: err.message });
	}
};
