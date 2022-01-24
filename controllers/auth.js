// Importation des modèles Comment de Prisma
const { PrismaClient } = require('@prisma/client');
const { user } = new PrismaClient();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @desc  CREATE A USER
// @route POST /api/v1/auth/register
// @access Public
exports.register = async (req, res, next) => {
	const { email, password, display_name } = req.body;
	const passwordRegex =
		/^(?=.{7,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/;
	if (!passwordRegex.test(password)) {
		return res
			.status(406)
			.json('Current password does not meet the requirments');
	}
	const userExists = await user.findUnique({
		where: {
			email,
		},
		select: {
			email: true,
		},
	});

	if (userExists) {
		res.status(400).json({
			message: 'User already exists',
		});
	} else {
		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = await user.create({
			data: {
				email,
				password: hashedPassword,
				display_name,
			},
		});

		res.status(201).json({
			message: 'User created',
			newUser,
		});
	}
};

// @desc  LOGIN A USER
// @route POST /api/v1/auth/login
// @access Public
exports.login = async (req, res, next) => {
	const { email, password } = req.body;

	// Check if email or password is empty
	if (!email || !password) {
		return res.status(400).json({
			message: 'user or password is empty',
		});
	}
	// Check for existing user
	const userExists = await user.findUnique({
		where: {
			email,
		},
		select: {
			email: true,
			password: true,
		},
	});

	if (!userExists) {
		return res.status(400).json({
			message: 'User does not exist',
		});
	}

	// Check password
	const isMatch = await bcrypt.compare(password, userExists.password);

	if (!isMatch) {
		return res.status(401).json({
			message: 'Invalid credentials',
		});
	}

	// Return JWT token if user is valid and password is correct (JWT is a JSON Web Token)
	const token = jwt.sign(
		{
			userId: userExists.id,
			email: userExists.email,
			display_name: userExists.display_name,
			role: userExists.role,
		},
		process.env.JWT_SECRET,
		{
			expiresIn: process.env.JWT_EXPIRE,
		}
	);
	// Setup options for cookie
	const options = {
		expires: new Date(
			Date.now() + process.env.JWT_EXPIRE * 24 * 60 * 60 * 1000
		),
		httpOnly: true,
	};
	// Secure options for cookie in production
	if (process.env.NODE_ENV === 'production') {
		options.secure = true;
	}
	// Set cookie with token and options
	res
		.cookie('token', token, options)
		.status(200)
		.json({ success: true, token });
};

// @desc Logout user
// @route GET /api/v1/auth/logout
// @access Private
exports.logout = async (req, res, next) => {
	try {
	} catch (error) {}
};
