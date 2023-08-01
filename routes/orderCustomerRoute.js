const express = require('express');
const router = express.Router();

const OrderCustomerController = require('../controllers/orderCustomerController.js');
const orderCustomerController = new OrderCustomerController();

// 상품 주문
router.post('/items/:itemId/orderCustomers', orderCustomerController.makeOrder);

module.exports = router;
