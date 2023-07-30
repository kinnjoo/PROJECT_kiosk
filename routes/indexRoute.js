const express = require('express');
const router = express.Router();

const itemRouter = require('./itemRoute.js');
const orderitemRouter = require('./orderitemRoute.js');

router.use('/', itemRouter);
router.use('/', orderitemRouter);

module.exports = router;
