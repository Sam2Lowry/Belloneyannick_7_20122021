const errorHandler = (err, req, res, next) => {
	let error = { ...err }; // Clone err object
	error.message = err.message; // Add message to error object

	// Log to console for dev
	console.log(err);

	// Prisma bad id error
	if (err.name === 'QueryResultError' && err.message.includes('id')) {
		const message = `Could not find ${err.path} with id ${err.value}`;
		error = new ErrorResponse(message, 404);
	}
	// Prisma duplicate key error
	if (err.name === 'QueryResultError' && err.message.includes('duplicate')) {
		const message = `Duplicate field value entered`;
		error = new ErrorResponse(message, 400);
	}
	// Prisma validation error
	if (err.name === 'ValidationError') {
		const message = Object.values(err.errors).map((val) => val.message);
		error = new ErrorResponse(message, 400);
	}

	res.status(Error.statusCode || 500).json({
		success: false,
		message: err.message || 'Something went wrong',
	});
};

module.exports = errorHandler;
