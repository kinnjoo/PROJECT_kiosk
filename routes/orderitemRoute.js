const express = require('express');
const router = express.Router();

const OrderItemController = require('../controllers/orderitemController.js');
const orderitemController = new OrderItemController();

// 상품 발주
router.post('/items/:itemId/orderItems', orderitemController.makeOrder);

// 발주 상태 수정
router.put(
  '/items/:itemId/orderItems/:id',
  orderitemController.modifyOrderItemState
);

module.exports = router;
