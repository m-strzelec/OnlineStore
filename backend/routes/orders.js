const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const Product = require('../models/product');
const OrderStatus = require('../models/orderStatus');
const HttpStatus = require('http-status-codes');

router.get('/', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Błąd serwera przy pobieraniu zamówień' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { userName, email, phoneNumber, orderedProducts } = req.body;

        // Walidacja pól zamówienia
        if (!userName || !email || !phoneNumber || (!orderedProducts || orderedProducts.length === 0)) {
            return res.status(HttpStatus.StatusCodes.BAD_REQUEST).json({
                message: !userName ? 'Nieprawidłowa nazwa użytkownika' :
                    !email ? 'Nieprawidłowy e-mail' :
                        !phoneNumber ? 'Nieprawidłowy numer telefonu' :
                            'Zamówienie musi zawierać co najmniej jeden produkt'
            });
        }
        // Walidacja numeru telefonu
        if (!/^\d{9}$/.test(phoneNumber)) {
            return res.status(HttpStatus.StatusCodes.BAD_REQUEST).json({ message: 'Numer telefonu zawiera niedozwolone znaki' });
        }
        // Walidacja emaila
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}$/.test(email)) {
            return res.status(HttpStatus.StatusCodes.BAD_REQUEST).json({ message: 'Email zawiera niedozwolone znaki' });
        }
        // Walidacja ilości towarów
        const invalidQuantity = orderedProducts.some(product => isNaN(product.quantity) || product.quantity <= 0);
        if (invalidQuantity) {
            return res.status(HttpStatus.StatusCodes.BAD_REQUEST).json({ message: 'Ilość towarów w zamówieniu musi być większa niż zero' });
        }
        // Walidacja identyfikatorów produktów
        const productIds = orderedProducts.map(product => product.product);
        const productsExist = await Product.find({ _id: { $in: productIds } });
        if (productsExist.length !== productIds.length) {
            return res.status(HttpStatus.StatusCodes.BAD_REQUEST).json({ message: 'Nieprawidłowe identyfikatory produktów w zamówieniu' });
        }

        const newOrder = await Order.create(req.body);
        res.status(HttpStatus.StatusCodes.CREATED).json(newOrder);
    } catch (error) {
        console.error(error);
        res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Błąd serwera przy dodawaniu nowego zamówienia' });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const { orderStatus } = req.body;
        const orderId = req.params.id;

        // Walidacja istnienia zamówienia
        const currentOrder = await Order.findById(orderId);
        if (!currentOrder) {
            return res.status(HttpStatus.StatusCodes.NOT_FOUND).json({ message: 'Zamówienie nie znalezione' });
        }
        // Walidacja zmiany statusu
        const currentStatus = await OrderStatus.findById(currentOrder.orderStatus);
        const newStatus = await OrderStatus.findById(orderStatus);
        if (!currentStatus || !newStatus) {
            return res.status(HttpStatus.StatusCodes.NOT_FOUND).json({ message: 'Podany status zamówienia nie istnieje' });
        }
        const validStatusChange = isValidStatusChange(currentStatus.name, newStatus.name);
        if (!validStatusChange) {
            return res.status(HttpStatus.StatusCodes.BAD_REQUEST).json({ message: 'Nieprawidłowa zmiana statusu zamówienia' });
        }

        const updatedOrder = await Order.findByIdAndUpdate(orderId, req.body, { new: true });
        if (!updatedOrder) {
            return res.status(HttpStatus.StatusCodes.NOT_FOUND).json({ message: 'Zamówienie nie znalezione' });
        }
        res.json(updatedOrder);
    } catch (error) {
        console.error(error);
        res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Błąd serwera przy aktualizacji zamówienia' });
    }
});

router.get('/status/:statusId', async (req, res) => {
    const statusId = req.params.statusId;
    try {
        const orders = await Order.find({ 'orderStatus': statusId });
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Błąd serwera przy pobieraniu zamówień według statusu' });
    }
});

function isValidStatusChange(currentStatus, newStatus) {
    const validStatusChanges = {
        'UNAPPROVED': ['CANCELLED', 'APPROVED'],
        'APPROVED': ['CANCELLED', 'COMPLETED'],
        'CANCELLED': [],
        'COMPLETED': [],
    };
    return validStatusChanges[currentStatus].includes(newStatus);
}

module.exports = router;
