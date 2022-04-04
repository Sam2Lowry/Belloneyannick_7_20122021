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
		res.status(200).json(users);
	} catch (err) {
		res.status(500).json(err.message);
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
		if (getUser.profile_image_url === null) {
			getUser.profile_image_url =
				'https://i.pinimg.com/1200x/a2/4c/16/a24c161fea2b24bd5967337d1684ff21.jpg';
		}

		if (!getUser) {
			return res.status(400).json('User not found');
		} else {
			res.status(200).json(getUser);
			/*res.status(200).json({ success: true, data: getUser });*/
		}
	} catch (err) {
		res.status(500).json(err.message);
	}
};

// @desc  UPDATE A USER
// @route PUT /api/v1/users/:id
// @access Private (admin or user)
exports.updateUser = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { userId, role } = jwt.decode(req.cookies.token);
		if (role === 'admin' || userId === parseInt(req.params.id)) {
			await user.update({
				where: {
					id: Number(id),
				},
				data: {
					...req.body,
				},
			});
			return res.status(200).json('User updated');
		} else {
			return res.status(401).json('Unauthorized');
		}
	} catch (err) {
		return res.status(500).json(err.message);
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
			return res.status(200).json('User deleted');
		} else return res.status(401).json('Unauthorized');
	} catch (err) {
		res.status(500).json(err.message);
	}
};
