const express = require('express');
const router = express.Router();

const authController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/isAdmin');


router.post('/register', authController.registerUser);
router.get('/login', authController.loginUser);
router.put('/edit', authMiddleware, authController.editUser);
router.put('/change-password', authMiddleware, authController.changePassword);
router.get('/users', authMiddleware, isAdmin, authController.getUsers);

module.exports = router;