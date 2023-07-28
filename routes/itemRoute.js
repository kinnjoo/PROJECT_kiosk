const express = require('express');
const router = express.Router();

const ItemController = require('../controllers/itemController.js');
const itemController = new ItemController();

// 상품 추가
router.post('/items', itemController.createItem);

// 상품 전체 리스트 조회(+페이지네이션)
router.get('/items', itemController.findAllItemsWithPageNation);

module.exports = router;
