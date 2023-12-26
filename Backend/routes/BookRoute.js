const express = require('express');
const { getAllBooks, createBook, getSingleBook, updateBook, deleteBook, gettingAllBooks } = require('../controller/BookController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const router = express.Router();

// creating routes 
router.route('/books')
  .get(getAllBooks).post(isAuthenticated, isAdmin("admin"), createBook);

router.route('/allbooks')
  .get(gettingAllBooks);

router.route('/books/:id')
  .get(getSingleBook).put(isAuthenticated, isAdmin("admin"), updateBook)
  .delete(isAuthenticated, isAdmin("admin"), deleteBook);

module.exports = router;