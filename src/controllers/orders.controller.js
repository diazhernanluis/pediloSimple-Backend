const log = require('../config/logger');
const { company } = require('../models/schemas/company');
const { products } = require('../models/schemas/products');
const { createOrder } = require('../services/order.services');

const getProductsToOrder = async (req, res) => {
    
    const { companyId } = req.params;
    try {
        const result = await products.find({ "uuid": companyId }).select('-__v');
        // const result = await products.find({'company': {'$regex': `^${companyName}$`, $options: 'i'}}).select('-__v');
        console.log(result);
        // result[0].products = groupBy(result[0].products, "category");
        res.status(200).send(result);
    } catch (e) {
        console.error("Error: ", e);
        log.error("Error: ", e);
        res.status(500).send("Error");
    }
};

const sendOrder = async (req, res) => {
    const { companyID, cart, totalAmount, customerName, customerEmail, customerPhone } = req.body;
    console.log('body:', req.body);
    if (!companyID || !cart || !customerName || !customerEmail || !customerPhone || !totalAmount) {
        return res.status(400).send("All order details are required.");
    }

    try {
        const newOrder =({
            companyID,
            products : cart,
            totalAmount,
            customerName,
            customerEmail,
            customerPhone
        });

        const savedOrder = await createOrder(newOrder);
        res.status(201).json(savedOrder);
    } catch (error) {
        log.error(`Error adding order for company ${companyID}: `, error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getProductsToOrder,
    sendOrder
}