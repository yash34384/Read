const Order = require('../models/OrderModel');
const catchAsyncError = require('../middleware/catchAsyncError');
const ErrorHandler = require('../utils/ErrorHandler');
const Book = require('../models/BookModel');

// create new order 
exports.newOrder = catchAsyncError(async (req, res, next) => {
  const { shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id
  });

  res.status(201).json({
    success: true,
    order
  })
})

// get single order 
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate("user", "name email");
  if (!order) {
    return next(new ErrorHandler("Order not found with this ID", 404));
  }
  res.status(200).json({
    success: true,
    order
  })
})

// get single user order 
exports.myOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json({
    success: true,
    orders
  })
})

// get all orders 
exports.getAllOrders = catchAsyncError(async (req, res, next) => {
  const order = await Order.find();
  let totalSell = 0;
  order.forEach((ele) => (totalSell += ele.totalPrice));
  res.status(200).json({
    success: true,
    totalSell,
    order
  })
})

// update status of Order 
exports.updateOrderStatus = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler("Order not found with this ID", 404));
  }
  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("Order is already Delivered", 400));
  }
  order.orderItems.forEach(async (ele) => {
    await updateStock(ele.product, ele.quantity)
  });
  order.orderStatus = req.body.status;
  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }
  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
    order
  })
})

// update the book stock after each delivery 
async function updateStock(id, quantity) {
  const book = await Book.findById(id);
  book.stock -= quantity;
  await book.save({ validateBeforeSave: false });
}

exports.deleteOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler("Order not with this ID", 404));
  }
  await Order.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    message: "Order deleted successfully"
  })
})