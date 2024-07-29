const {products} = require('../models/schemas/products.js');

const getAll = async () => await products.find();

const getProductByEmail = async (email) => await products.findOne({email: email});

const createProduct = async (info) => await products.create(info);

const updateProductById = async (id, info) => await products.updateOne({_id: id}, { $set: info});


module.exports = {
    getAll,
    getProductByEmail,
    createProduct,
    updateProductById
}