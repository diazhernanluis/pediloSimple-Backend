const mongoose = require('mongoose');
const orderCollection = 'orders';

const orderSchema = new mongoose.Schema({
    companyName: {type: String, required: true},
    order: { type: Array, required: true},
    timestamp: {type: new Date, required: true},
});

const order = new mongoose.model(orderCollection, orderSchema);

module.exports = {
    order
}