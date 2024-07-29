const log  = require('../config/logger');
const { company }  = require('../models/schemas/company');
const { products } = require('../models/schemas/products');
const uuid = require('uuid');
const { createProduct } = require('../services/products.service');

const getCompanyProducts = async (req, res) => {
    const { companyId } = req.params;

    if (!companyId) {
        return res.status(400).send("Company ID is required");
    }

    try {
        const result = await products.find({ companyId: companyId }).select("-__v");

        if (!result.length) {
            return res.status(404).json("No products found");
        }
        console.log(result)
        res.status(200).json(result);;
    } catch (e) {
        log.error(`Error fetching products for company ${companyId}: `, e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


const addCompanyProducts = async (req, res) => {
    const { companyId } = req.params;
    const { name, price } = req.body;

    if (!companyId || !name || !price) {
        return res.status(400).send("All fields are required");
    }

    try {
        const newProduct ={
            companyId,
            name,
            price
        };

        const createdProduct = await createProduct(newProduct);
        res.status(201).json(createdProduct);
    } catch (e) {
        log.error(`Error adding product for company ${companyId}: `, e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports = {
    getCompanyProducts,
    addCompanyProducts
}