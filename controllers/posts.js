// Importation des modèles Post de Prisma
const { PrismaClient } = require('@prisma/client');
const { post } = new PrismaClient();

// @desc  GET ALL POST
// @route GET /api/v1/posts/
// @access Public
exports.getPosts = async (req, res, next) => {
	try {
		const posts = await post.findMany();
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
		await post.create({ data: req.body });
		res.status(201).json({ success: true, data: { message: 'Post created' } });
	} catch (err) {
		res.status(500).json({ success: false, error: err.message });
	}
};

// @desc  UPDATE A POST
// @route PUT /api/v1/posts/:id
// @access Private (admin or user)
exports.updatePost = async (req, res, next) => {
	try {
		const { id } = req.params;
		await post.update({
			where: {
				id: Number(id),
			},
			data: req.body,
		});
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

		res.status(200).json({ success: true, data: { message: 'Post deleted' } });
	} catch (err) {}
};

/*
app.get('/feed', async (req, res) => {
  const { searchString, skip, take, orderBy } = req.query

  const or = searchString
    ? {
        OR: [
          { title: { contains: searchString } },
          { content: { contains: searchString } },
        ],
      }
    : {}

  const posts = await prisma.post.findMany({
    where: {
      published: true,
      ...or,
    },
    include: { author: true },
    take: Number(take) || undefined,
    skip: Number(skip) || undefined,
    orderBy: {
      updatedAt: orderBy || undefined,
    },
  })

  res.json(posts)
})
*/
