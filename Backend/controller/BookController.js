const Book = require('../models/BookModel');
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const ApiFeatures = require('../utils/ApiFeatures');

// create new book 
exports.createBook = catchAsyncError(async (req, res, next) => {
  const data = req.body;
  const book = await Book.create(data);
  res.status(201).json({
    success: true,
    book
  })
})

//getting all books
exports.gettingAllBooks = catchAsyncError(async (req, res, next) => {
  const books = await Book.find();
  res.status(200).json({
    success: true,
    books
  })
})

// getting all books by category 
exports.getAllBooks = catchAsyncError(async (req, res, next) => {
  const resultPerPage = process.env.RESULT_PER_PAGE;
  const data = new ApiFeatures(Book.find(), req.query)
    .search()
    .pagination(resultPerPage)
    .filter();

  const books = await data.query;
  const bookCount = books.length;

  res.status(200).json({
    success: true,
    bookCount,
    books
  })
})

// getting single book 
exports.getSingleBook = catchAsyncError(async (req, res, next) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    return next(new ErrorHandler("OOPS! Book doesn't exist", 404));
  }
  res.status(200).json({
    success: true,
    book
  })
})

// update book
exports.updateBook = catchAsyncError(async (req, res, next) => {
  let book = await Book.findById(req.params.id);
  if (!book) {
    return next(new ErrorHandler("OOPS! Book doesn't exists", 404));
  }
  book = await Book.findByIdAndUpdate(req.params.id, req.body);
  res.status(201).json({
    success: true,
    book
  })
})

// delete book
exports.deleteBook = catchAsyncError(async (req, res, next) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    return next(new ErrorHandler("OOPS! Book doesn't exists", 404));
  }
  await Book.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    message: "Book deleted successfully"
  })
})