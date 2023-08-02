const express = require('express');
const router = express.Router();

const optionRouter = require('./optionRoute.js');
const itemRouter = require('./itemRoute.js');
const orderitemRouter = require('./orderitemRoute.js');
const orderCustomerRouter = require('./orderCustomerRoute.js');

router.use('/', optionRouter);
router.use('/', itemRouter);
router.use('/', orderitemRouter);
router.use('/', orderCustomerRouter);

module.exports = router;
