const express = require('express');
const {
	getUsers,
	getUser,
	updateUser,
	deleteUser,
} = require('../controllers/users');

const router = express.Router();
const { protect, authorize } = require('../middlewares/auth');

router.route('/').get(getUsers);
router
	.route('/:id')
	.get(getUser)
	.put(updateUser, protect, authorize('admin'))
	.delete(deleteUser, protect, authorize('admin'));

module.exports = router;
