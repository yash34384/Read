const express = require('express');
const { createUser, getAllUsers, deleteUser, updateUser, loginUser, logoutUser, getUserDetails, forgotPassword, resetPassword, changePassword } = require('../controller/UserConttroller');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

const router = express.Router();

// creating routes 
router.route('/user')
  .post(createUser).get(isAuthenticated, isAdmin("admin"), getAllUsers);

router.route('/user/:id')
  .delete(isAuthenticated, deleteUser);

router.route('/login')
  .post(loginUser);

router.route('/logout')
  .get(isAuthenticated, logoutUser);

router.route('/me')
  .get(isAuthenticated, getUserDetails);

router.route('/password/forgot')
  .post(forgotPassword);

router.route('/password/reset/:token')
  .put(resetPassword);

router.route('/password/update')
  .put(isAuthenticated, changePassword);

router.route('/me/update')
  .put(isAuthenticated, updateUser);

module.exports = router;