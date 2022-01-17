// @desc  GET ALL USERS
// @route GET /api/v1/users/
// @access Public
exports.getUsers = (req, res, next) => {
	res.status(200).json({ success: true, message: 'bring all the users !!' });
};

// @desc  GET A SINGLE USER
// @route GET /api/v1/users/:id
// @access Public
exports.getUser = (req, res, next) => {
	res
		.status(200)
		.json({ success: true, message: `Display user ${req.params.id}` });
};

// @desc  CREATE A USER
// @route POST /api/v1/users/
// @access Public
exports.createUser = (req, res, next) => {
	res.status(200).json({ success: true, message: 'Create a user' });
};

// @desc  UPDATE A USER
// @route PUT /api/v1/users/:id
// @access Private
exports.updateUser = (req, res, next) => {
	res
		.status(200)
		.json({ success: true, message: `update user ${req.params.id}` });
};

// @desc  DELETE A USER
// @route DELETE /api/v1/users/:id
// @access Private (admin only)
exports.deleteUser = (req, res, next) => {
	res
		.status(200)
		.json({ success: true, message: 'delete an user, mouhahaha !!' });
};
