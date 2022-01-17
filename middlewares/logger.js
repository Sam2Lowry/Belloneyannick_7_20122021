// @desc LOGS THE REQUEST IN THE CONSOLE
// @route ANY /api/v1/*
// @access PUBLIC
const logger = (req, res, next) => {
	console.log(
		`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`
	);
	next();
};

module.exports = logger;
