const express = require('express');
const router = express.Router();

const ItemController = require('../controllers/itemController.js');
const itemController = new ItemController();

// 상품 추가
router.post('/items', itemController.makeItem);

// 상품 리스트 조회(전체)
router.get('/items', itemController.findAllItems);

// 상품 리스트 조회(타입별)
router.get('/items/type', itemController.findAllItemsByType);

// 상품 삭제
router.delete('/items/:id', itemController.deleteItem);

// 상품 삭제(item의 amount가 0이 아닐 경우)
router.delete('/answer/items/:id', itemController.deleteItemCheckAnswer);

// 상품 수정
router.put('/items/:id', itemController.modifyItem);

module.exports = router;
