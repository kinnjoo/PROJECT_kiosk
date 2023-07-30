const express = require('express');
const router = express.Router();

const OrderItemController = require('../controllers/orderitemController.js');
const orderitemController = new OrderItemController();

// 상품 발주
router.post('/orderItems/:itemId', orderitemController.makeOrder);

module.exports = router;
