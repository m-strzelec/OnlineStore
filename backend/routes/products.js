const express = require('express');
const router = express.Router();
const Category = require('../models/category');
const Product = require('../models/product');
const HttpStatus = require('http-status-codes');

router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Błąd serwera przy pobieraniu produktów' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(HttpStatus.StatusCodes.NOT_FOUND).json({ message: 'Produkt nie znaleziony' });
        }
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Błąd serwera przy pobieraniu produktu' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { name, description, price, weight, category } = req.body;
        const categoryExist = await Category.findById(category);
        if (!name || !description || price <= 0 || weight <= 0 || (!category || !categoryExist)) {
            return res.status(HttpStatus.StatusCodes.BAD_REQUEST).json({ 
                message: !name ? 'Nieprawidłowa nazwa produktu' :
                    !description ? 'Nieprawidłowy opis produktu' :
                        price <= 0 ? 'Nieprawidłowa cena produktu' :
                            weight <= 0 ? 'Nieprawidłowa waga produktu' :
                                'Nieprawidłowa kategoria produktu'
            });
        }
        const newProduct = await Product.create(req.body);
        res.status(HttpStatus.StatusCodes.CREATED).json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Błąd serwera przy dodawaniu nowego produktu' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { name, description, price, weight, category } = req.body;
        const categoryExist = await Category.findById(category);
        if (!name || !description || price <= 0 || weight <= 0 || (!category || !categoryExist)) {
            return res.status(HttpStatus.StatusCodes.BAD_REQUEST).json({
                message: !name ? 'Nieprawidłowa nazwa produktu' :
                    !description ? 'Nieprawidłowy opis produktu' :
                        price <= 0 ? 'Nieprawidłowa cena produktu' :
                            weight <= 0 ? 'Nieprawidłowa waga produktu' :
                                'Nieprawidłowa kategoria produktu'
            });
        }
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(HttpStatus.StatusCodes.NOT_FOUND).json({ message: 'Produkt nie znaleziony' });
        }
        res.json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Błąd serwera przy aktualizacji produktu' });
    }
});

// router.put('/', async (req, res) => {
//     const { _id, ...updatedProductData } = req.body;
//     try {
//         const updatedProduct = await Product.findByIdAndUpdate(_id, updatedProductData, { new: true });

//         if (!updatedProduct) {
//             return res.status(404).json({ message: 'Produkt nie znaleziony' });
//         }

//         res.json(updatedProduct);
//     } catch (error) {
//         res.status(400).json({ message: 'Nieprawidłowe dane zaktualizowane' });
//     }
// });

module.exports = router;
