// Importation des modèles Post de Prisma
const { PrismaClient } = require('@prisma/client');
const { post } = new PrismaClient();

// @desc  GET ALL POST
// @route GET /api/v1/posts/
// @access Public
exports.getPosts = async (req, res, next) => {
	try {
		const posts = await post.findMany();
		if (!posts) {
			return res.status(404).json({ success: false, error: 'No posts found' });
		}
		res.status(200).json({ success: true, count: posts.length, data: posts });
	} catch (err) {
		res.status(500).json({ success: false, error: err.message });
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
			return res.status(404).json({ success: false, error: 'Post not found' });
		}
		res.status(200).json({ success: true, count: posts.length, data: posts });
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
		res.status(200).json({ success: true, data: getPost });
	} catch (err) {
		res.status(500).json({ success: false, error: err.message });
	}
};

// @desc  CREATE A POST
// @route POST /api/v1/posts/
// @access Public
exports.createPost = async (req, res, next) => {
	try {
		const userId = jwt.decode(request.cookies.token);
		const { title, content } = req.body;
		const newPost = await post.create({
			data: {
				title: title,
				content: content,
				author_id: userId,
			},
		});
		res.status(201).json({ success: true, data: newPost });
	} catch (err) {
		res.status(500).json({ success: false, error: err.message });
	}
};

// @desc  UPDATE A POST
// @route PUT /api/v1/posts/:id
// @access Private (admin or user) from roles
exports.updatePost = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { title, content, author_id, post_id } = req.body;
		const { userId, role } = jwt.decode(request.cookies.token);
		if (role === 'admin' || author_id === userId) {
			const updatePost = await post.update({
				where: {
					id: Number(id),
				},
				data: {
					title: title,
					content: content,
					author_id: author_id,
					post_id: post_id,
				},
			});
			res.status(200).json({ success: true, data: updatePost });
		} else {
			res.status(401).json({ success: false, error: 'Unauthorized' });
		}
	} catch (err) {
		res.status(500).json({ success: false, error: err.message });
	}
};

// @desc  DELETE A POST
// @route DELETE /api/v1/posts/:id
// @access Private (admin or user)
exports.deletePost = async (req, res, next) => {
	try {
		const { id } = req.params;
		await post.delete({
			where: {
				id: Number(id),
			},
		});
		if (!post) {
			return res.status(404).json({ success: false, error: 'Post not found' });
		}
		res.status(200).json({ success: true, data: { message: 'Post deleted' } });
	} catch (err) {
		res.status(500).json({ success: false, error: err.message });
	}
};
