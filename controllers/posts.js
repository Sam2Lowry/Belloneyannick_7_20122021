// Importation des modèles Post de Prisma
const { PrismaClient } = require('@prisma/client');
const { post } = new PrismaClient();
const jwt = require('jsonwebtoken');

// @desc  GET ALL POST
// @route GET /api/v1/posts/
// @access Public
exports.getPosts = async (req, res, next) => {
	try {
		const posts = await post.findMany();
		if (!posts) {
			return res.status(404).json('No posts found');
		}
		res.status(200).json(posts);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

// @desc GET ALL POST BY USER
// @route GET /api/v1/posts/user/:id
// @access Public
exports.getAllPosts = async (req, res, next) => {
	try {
		const { id } = req.params;
		const posts = await post.findMany({
			where: {
				user: {
					id: Number(id),
				},
			},
		});
		if (!posts) {
			return res.status(404).json('Post not found');
		}
		res.status(200).json(posts);
	} catch (err) {}
};

// @desc  GET A SINGLE POST
// @route GET /api/v1/posts/:id
// @access Public
exports.getPost = async (req, res, next) => {
	try {
		const { id } = req.params;
		const getPost = await post.findUnique({
			where: {
				id: Number(id),
			},
		});
		if (!getPost) {
			return res.status(404).json({ success: false, error: 'Post not found' });
		}
		res.status(200).json(getPost);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

// @desc  CREATE A POST
// @route POST /api/v1/posts/
// @access Public
exports.createPost = async (req, res, next) => {
	try {
		// Get the user id from the token
		token = req.headers.authorization.split(' ')[1];
		const { userId } = jwt.decode(token);
		console.log(userId);
		const { title, content } = req.body;
		const newPost = await post.create({
			data: {
				title: title,
				content: content,
				author_id: userId,
			},
		});
		res.status(201).json(newPost);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

// @desc  UPDATE A POST
// @route PUT /api/v1/posts/:id
// @access Private (admin or user) from roles
exports.updatePost = async (req, res, next) => {
	try {
		const { userId, role } = jwt.decode(req.cookies.token);
		const { id } = req.params;
		const post = await post.findUnique({
			where: {
				id: Number(id),
			},
		});
		if (!post) {
			return res.status(404).json('Post not found');
		}
		// Make sure the user is the author of the post or an admin
		if (userId !== post.author_id && role !== 'admin') {
			return res.status(401).json('Unauthorized');
		}
		const { title, content } = req.body;
		const updatedPost = await post.update({
			where: {
				id: Number(id),
			},
			data: {
				title: title,
				content: content,
			},
		});
		res.status(200).json(updatedPost);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

// @desc  DELETE A POST
// @route DELETE /api/v1/posts/:id
// @access Private (admin or user)
exports.deletePost = async (req, res, next) => {
	try {
		// Get the user id from url params
		const { id } = req.params;
		// Get the user id from the token
		token = req.headers.authorization.split(' ')[1];
		const { userId, role } = jwt.decode(token);
		const postExist = await post.findUnique({
			where: {
				id: Number(id),
			},
		});
		if (!postExist) {
			return res.status(404).json('Post not found');
		}
		// Make sure the user is the author of the post or an admin
		if (userId === post.author_id || role === 'admin') {
			return res.status(401).json('Unauthorized');
		}

		const deletedPost = await post.delete({
			where: {
				id: Number(id),
			},
		});
		res.status(200).json(deletedPost);
	} catch (err) {
		res.status(500).json(err.message);
	}
};
