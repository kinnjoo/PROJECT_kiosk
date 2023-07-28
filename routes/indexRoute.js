const express = require('express');
const router = express.Router();

const itemRouter = require('./itemRoute.js');

router.use('/', itemRouter);

module.exports = router;
