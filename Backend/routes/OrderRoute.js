const express = require('express');
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrderStatus, deleteOrder } = require('../controller/OrderController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

const router = express.Router();

router.route('/order/new')
  .post(isAuthenticated, newOrder);

router.route('/order/:id')
  .get(isAuthenticated, getSingleOrder);

router.route('/orders/me')
  .get(isAuthenticated, myOrders);

router.route('/all/orders')
  .get(isAuthenticated, isAdmin("admin"), getAllOrders);

router.route('/update/order/:id')
  .put(isAuthenticated, isAdmin("admin"), updateOrderStatus)
  .delete(isAuthenticated, isAdmin("admin"), deleteOrder);

module.exports = router;