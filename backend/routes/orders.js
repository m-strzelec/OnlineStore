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
        res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error while getting orders' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { userName, email, phoneNumber, orderedProducts } = req.body;

        // Walidacja pól zamówienia
        if (!userName || !email || !phoneNumber || (!orderedProducts || orderedProducts.length === 0)) {
            return res.status(HttpStatus.StatusCodes.BAD_REQUEST).json({
                message: !userName ? 'Wrong username' :
                    !email ? 'Wrong e-mail' :
                        !phoneNumber ? 'Wrong phone number' :
                            'Order need to have at least one product'
            });
        }
        // Walidacja numeru telefonu
        if (!/^\d{9}$/.test(phoneNumber)) {
            return res.status(HttpStatus.StatusCodes.BAD_REQUEST).json({ message: 'Phone numbers contains unallowed characters' });
        }
        // Walidacja emaila
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}$/.test(email)) {
            return res.status(HttpStatus.StatusCodes.BAD_REQUEST).json({ message: 'Email contains unallowed characters' });
        }
        // Walidacja ilości towarów
        const invalidQuantity = orderedProducts.some(product => isNaN(product.quantity) || product.quantity <= 0);
        if (invalidQuantity) {
            return res.status(HttpStatus.StatusCodes.BAD_REQUEST).json({ message: 'Amount of items must be greater than zero' });
        }
        // Walidacja identyfikatorów produktów
        const productIds = orderedProducts.map(product => product.product);
        const productsExist = await Product.find({ _id: { $in: productIds } });
        if (productsExist.length !== productIds.length) {
            return res.status(HttpStatus.StatusCodes.BAD_REQUEST).json({ message: 'Wrong products id values in order' });
        }

        const newOrder = await Order.create(req.body);
        res.status(HttpStatus.StatusCodes.CREATED).json(newOrder);
    } catch (error) {
        console.error(error);
        res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error while adding new order' });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        if(req.params.id === 'undefinedId') {
            return res.status(HttpStatus.StatusCodes.NOT_FOUND).json({ message: 'Order not found' });
        }
        const { orderStatus } = req.body;
        const orderId = req.params.id;

        // Walidacja istnienia zamówienia
        const currentOrder = await Order.findById(orderId);
        if (!currentOrder) {
            return res.status(HttpStatus.StatusCodes.NOT_FOUND).json({ message: 'Order not found' });
        }
        // Walidacja zmiany statusu
        const currentStatus = await OrderStatus.findById(currentOrder.orderStatus);
        const newStatus = await OrderStatus.findById(orderStatus);
        if (!currentStatus || !newStatus) {
            return res.status(HttpStatus.StatusCodes.NOT_FOUND).json({ message: 'Status does not exist' });
        }
        const validStatusChange = isValidStatusChange(currentStatus.name, newStatus.name);
        if (!validStatusChange) {
            return res.status(HttpStatus.StatusCodes.BAD_REQUEST).json({ message: 'Unallowed order status change' });
        }
        let data = req.body;
        if (newStatus.name === 'APPROVED') {
            const currentDate = new Date();
            currentDate.setHours(currentDate.getHours() + 1);
            const formattedDate = currentDate.toJSON().slice(0, 19).replace('T', ' ');
            data = { orderStatus: newStatus._id, approvalDate: formattedDate }
        }
        const updatedOrder = await Order.findByIdAndUpdate(orderId, data, { new: true });
        if (!updatedOrder) {
            return res.status(HttpStatus.StatusCodes.NOT_FOUND).json({ message: 'Order not found' });
        }
        res.json(updatedOrder);
    } catch (error) {
        console.error(error);
        res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error while updating order' });
    }
});

router.get('/status/:statusId', async (req, res) => {
    if(req.params.statusId === 'undefinedId') {
        return res.status(HttpStatus.StatusCodes.NOT_FOUND).json({ message: 'Status not found' });
    }
    const statusId = req.params.statusId;
    try {
        const orders = await Order.find({ 'orderStatus': statusId });
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error while getting orders by status' });
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
