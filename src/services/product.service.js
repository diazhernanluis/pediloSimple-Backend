const product = require('../models/schemas/products.js');

const getAll = async () => await product.find();

const getProductByEmail = async (email) => await product.findOne({email: email});

const createProduct = async (info) => await product.create(info);

const updateProductById = async (id, info) => await product.updateOne({_id: id}, { $set: info});


module.exports = {
    getAll,
    getProductByEmail,
    createProduct,
    updateProductById
}