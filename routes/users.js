const express = require('express');
const {
	getUsers,
	getUser,
	updateUser,
	deleteUser,
} = require('../controllers/users');

const router = express.Router();
const { protect } = require('../middlewares/auth');

router.route('/').get(getUsers);
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
