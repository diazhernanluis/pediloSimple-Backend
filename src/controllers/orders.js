const { log } = require('../config/logger');
const { company } = require('../models/company');
const { products } = require('../models/products');
const uuid = require('uuid');

const getProductsToOrder = async (req, res) => {
    
    const { companyName } = req.params;
    try {
        const result = await products.find({ "company": companyName }).select('-__v');
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

const groupBy = (xs, key) => {
    return xs.reduce((rv, x) => {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
};

module.exports = {
    getProductsToOrder
}