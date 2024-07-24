const mongoose = require('mongoose');
const productsCollection = 'products';

const productsSchema = new mongoose.Schema({
    companyId: { type: String, required: true},
    name: { type: String, required: true},
    price: { type: Number, required: true},
    versionKey: false
});

const products = new mongoose.model(productsCollection, productsSchema);

module.exports = {
    products
}