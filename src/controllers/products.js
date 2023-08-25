const { log } = require('../config/logger');
const { company } = require('../models/company');
const { products } = require('../models/products');
const uuid = require('uuid');

const getCompanyProducts = async (req, res) => {
    const { companyName } = req.params;

    try {
        const result = await products.find({company: companyName}).select("-__v");
        res.status(200).send(result);
    } catch (e) {
        log.error("Error: ", e);
        res.status(500).send("Error");
    }
}

const addCompanyProducts = async (req, res) => {
    const { companyName } = req.params;
    try {
        let addProduct = { companyName, ...req.body};
        const result = await products.create(addProduct);
        res.status(200).send(result);
    } catch (e) {
        log.error("Error: ", e);
        res.status(500).send(e);
    }
}

module.exports = {
    getCompanyProducts,
    addCompanyProducts
}