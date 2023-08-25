const routes = require('express').Router();
const { log } = require('../config/logger');
const { getProductsToOrder } = require('../controllers/orders');

// retorna al cliente la lista para pedir
routes.get('/:companyName', getProductsToOrder);

module.exports = routes