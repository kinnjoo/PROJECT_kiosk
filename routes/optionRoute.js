const express = require('express');
const router = express.Router();

const OptionController = require('../controllers/optionController.js');
const optionController = new OptionController();

// 옵션 추가
router.post('/options', optionController.makeOption);

// 옵션 삭제
router.delete('/options/:id', optionController.deleteOption);

module.exports = router;
