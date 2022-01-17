// @desc  GET ALL POST
// @route GET /api/v1/posts/
// @access Public
exports.getPosts = (req, res, next) => {
	res.status(200).json({ success: true, message: 'bring all the posts !!' });
};

// @desc  GET A SINGLE POST
// @route GET /api/v1/posts/:id
// @access Public
exports.getPost = (req, res, next) => {
	res
		.status(200)
		.json({ success: true, message: `Display post ${req.params.id}` });
};

// @desc  CREATE A POST
// @route POST /api/v1/posts/
// @access Public
exports.createPost = (req, res, next) => {
	res.status(200).json({ success: true, message: 'Create a post' });
};

// @desc  UPDATE A POST
// @route PUT /api/v1/posts/:id
// @access Private (admin or user)
exports.updatePost = (req, res, next) => {
	res
		.status(200)
		.json({ success: true, message: `update post ${req.params.id}` });
};

// @desc  DELETE A POST
// @route DELETE /api/v1/posts/:id
// @access Private (admin or user)
exports.deletePost = (req, res, next) => {
	res
		.status(200)
		.json({ success: true, message: 'delete an post, mouhahaha !!' });
};
