const { PrismaClient } = require('@prisma/client');
const { user } = new PrismaClient();
const jwt = require('jsonwebtoken');

// Protect routes
exports.protect = async (req, res, next) => {
	let token;

	// Check if authorization header is set
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		// Set token to authorization header
		token = req.headers.authorization.split(' ')[1];
	}

	//else if (req.cookies.token) {
	//    token = req.cookies.token;
	//}

	// Check if token is set
	if (!token) {
		return res.status(401).json({
			message: 'You are not logged in',
		});
	}
	try {
		// Verify token
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		console.log(decoded);

		req.user = await user.findUnique({
			where: {
				id: decoded.userId,
			},
			select: {
				id: true,
				email: true,
				display_name: true,
				role: true,
			},
		});

		next();
	} catch (err) {
		console.log(err);
	}
};

// Grant access to specific roles only (user or admin)
// If the user's role is not in the list of roles passed to the authorize function, return a 403 error.
exports.authorize = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			return res.status(403).json({
				message: 'You are not authorized to perform this action',
			});
		}
		next();
	};
};
