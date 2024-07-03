const routes = require('express').Router();
const { getProductsToOrder } = require('../controllers/orders.controller');

// retorna al cliente la lista para pedir
routes.get('/:companyName', getProductsToOrder);

module.exports = routes