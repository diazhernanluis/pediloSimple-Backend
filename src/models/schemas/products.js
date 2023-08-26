const mongoose = require('mongoose');
const productsCollection = 'products';

const productsSchema = new mongoose.Schema({
    company: { type: String, required: true},
    products: { type: Array, required: true},
    versionKey: false
});

const products = new mongoose.model(productsCollection, productsSchema);

module.exports = {
    products
}