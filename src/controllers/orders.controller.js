const { log } = require('../config/logger');
const { company } = require('../models/schemas/company');
const { products } = require('../models/schemas/products');

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

const sendOrder = async (req, res) => {
    // hay que tomar el formulario que viene desde el front, guardarlo en la base, generar el link de whatsApp y enviarlo
}

module.exports = {
    getProductsToOrder
}