const express = require('express');
const router = express.Router();

const ItemController = require('../controllers/itemController.js');
const itemController = new ItemController();

// 상품 추가
router.post('/items', itemController.createItem);

module.exports = router;
