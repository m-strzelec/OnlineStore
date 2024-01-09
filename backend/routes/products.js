const express = require('express');
const router = express.Router();
const Category = require('../models/category');
const Product = require('../models/product');
const HttpStatus = require('http-status-codes');
const { Decimal128 } = require('mongodb');

router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error while getting products' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        if(req.params.id === 'undefinedId') {
            return res.status(HttpStatus.StatusCodes.NOT_FOUND).json({ message: 'Product not found' });
        }
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(HttpStatus.StatusCodes.NOT_FOUND).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error while getting product' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { name, description, price, weight, category } = req.body;
        const categoryExist = await Category.findById(category);
        if (!name || !description || price <= 0 || weight <= 0 || (!category || !categoryExist)) {
            return res.status(HttpStatus.StatusCodes.BAD_REQUEST).json({
                message: !name ? 'Wrong product name' :
                    !description ? 'Wrong product description' :
                        price <= 0 ? 'Wrong product price' :
                            weight <= 0 ? 'Wrong product weight' :
                                'Wrong product category'
            });
        }
        const newProduct = await Product.create(req.body);
        res.status(HttpStatus.StatusCodes.CREATED).json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error while adding new product' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        if(req.params.id === 'undefinedId') {
            return res.status(HttpStatus.StatusCodes.NOT_FOUND).json({ message: 'Product not found' });
        }
        const { name, description, price, weight, category } = req.body;
        const categoryExist = await Category.findById(category);
        if (!name || !description || price <= 0 || weight <= 0 || (!category || !categoryExist)) {
            return res.status(HttpStatus.StatusCodes.BAD_REQUEST).json({
                message: !name ? 'Wrong product name' :
                    !description ? 'Wrong product description' :
                        price <= 0 ? 'Wrong product price' :
                            weight <= 0 ? 'Wrong product weight' :
                                'Wrong product category'
            });
        }
        req.body.price = Decimal128.fromString(req.body.price);
        req.body.weight = Decimal128.fromString(req.body.weight);
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(HttpStatus.StatusCodes.NOT_FOUND).json({ message: 'Product not found' });
        }
        res.json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error while updating product' });
    }
});

module.exports = router;
