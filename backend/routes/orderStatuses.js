const express = require('express');
const router = express.Router();
const OrderStatus = require('../models/orderStatus');
const HttpStatus = require('http-status-codes');

router.get('/', async (req, res) => {
    try {
        const orderStatuses = await OrderStatus.find();
        res.json(orderStatuses);
    } catch (error) {
        console.error(error);
        res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error while getting order statuses' });
    }
});

module.exports = router;

