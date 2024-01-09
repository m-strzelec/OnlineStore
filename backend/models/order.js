const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    approvalDate: { type: String, default: '' },
    orderStatus: { type: mongoose.Schema.Types.ObjectId, ref: 'OrderStatus', default: '658c499242d4e6396743acc8' },
    userName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    orderedProducts: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
    }],
}, {
    versionKey: false
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
