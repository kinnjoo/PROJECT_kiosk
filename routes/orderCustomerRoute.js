const express = require('express');
const router = express.Router();

const OrderCustomerController = require('../controllers/orderCustomerController.js');
const orderCustomerController = new OrderCustomerController();

// 상품 주문
router.post('/orderCustomers', orderCustomerController.makeOrder);

// 상품 주문 수정
router.put(
  '/orderCustomers/:orderCustomerId',
  orderCustomerController.modifyOrderCustomer
);

module.exports = router;
