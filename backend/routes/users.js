const express = require('express');
const router = express.Router();
const { 
  getUsers, 
  getUserById, 
  updateProfile, 
  deleteUser 
} = require('../controllers/userController');
const { protect, admin } = require('../middleware/auth');

router.put('/profile', protect, updateProfile);
router.get('/', protect, admin, getUsers);
router.get('/:id', protect, admin, getUserById);
router.delete('/:id', protect, admin, deleteUser);

module.exports = router;
