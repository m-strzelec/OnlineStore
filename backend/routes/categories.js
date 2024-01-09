const express = require('express');
const router = express.Router();
const Category = require('../models/category');
const HttpStatus = require('http-status-codes');

router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        console.error(error);
        res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error while getting categories' });
    }
});

module.exports = router;

