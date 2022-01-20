const errorHandler = (err, req, res, next) => {
	let error = { ...err }; // Clone err object
	error.message = err.message; // Add message to error object

	// Log to console for dev
	console.log(err);

	// Prisma bad id error
	if (err.name === 'QueryResultError' && err.message.includes('id')) {
		return res.status(404).json({
			status: 'fail',
			message: 'Resource not found',
		});
	}
	// Prisma duplicate key error
	if (err.name === 'QueryResultError' && err.message.includes('duplicate')) {
		return res.status(409).json({
			status: 'fail',
			message: 'Duplicate key',
		});
	}
	// Prisma validation error
	if (err.name === 'ValidationError') {
		return res.status(400).json({
			status: 'fail',
			message: err.message,
		});
	}

	res.status(Error.statusCode || 500).json({
		success: false,
		message: err.message || 'Something went wrong',
	});
};

module.exports = errorHandler;
