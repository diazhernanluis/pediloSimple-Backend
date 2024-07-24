const { log } = require('../config/logger');
const { company } = require('../models/schemas/company');
const { products } = require('../models/schemas/products');
const uuid = require('uuid');

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
    const { companyName } = req.params;
    try {
        let addProduct = { companyName, ...req.body};
        const result = await products.create(addProduct);
        res.status(201).json(result);
    } catch (e) {
        log.error("Error: ", e);
        res.status(500).json(e);
    }
}

module.exports = {
    getCompanyProducts,
    addCompanyProducts
}