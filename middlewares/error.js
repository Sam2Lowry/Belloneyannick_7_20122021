const { Prisma } = require('.prisma/client');
const ErrorResponse = require('../utils/ErrorResponse');

const errorHandler = async (err, req, res, next) => {
	//Loading prismaErrorList

	let currentError = err;

	currentError.Message = err.Message;

	console.log(currentError.stack.blue);

	if (err instanceof Prisma.PrismaClientKnownRequestError) {
		if (err.code === 'P2001') {
			currentError = new ErrorResponse('Source not found', 404);
		} else if (err.code === 'P2002') {
			currentError = new ErrorResponse(
				'The source has already been added.',
				400
			);
		} else if (err.code === 'P2003') {
			currentError = new ErrorResponse(
				'An error occurred while adding the resource. The other resource to which the resource is linked could not be found',
				400
			);
		} else if (err.code === 'P2025') {
			currentError = new ErrorResponse('No record was found', 404);
		} else {
			currentError = new ErrorResponse(`Error was found : ${err.message}`, 400);
		}
	}

	res.status(currentError.statusCode || 500).json({
		success: false,
		message: currentError.message || 'Server Error',
	});
};

module.exports = errorHandler;
