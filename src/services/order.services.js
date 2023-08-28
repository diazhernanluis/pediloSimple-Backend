const order = require('../models/schemas/orders.js');

const getAll = async () => await order.find();

const getOrderByEmail = async (email) => await order.findOne({email: email});

const createOrder = async (info) => await order.create(info);

const updateOrderById = async (id, info) => await order.updateOne({_id: id}, { $set: info});


module.exports = {
    getAll,
    getOrderByEmail,
    createOrder,
    updateOrderById
}