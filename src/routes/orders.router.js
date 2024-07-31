const routes = require('express').Router();
const { getProductsToOrder, sendOrder} = require('../controllers/orders.controller');

// retorna al cliente la lista para pedir
routes.get('/:companyId', getProductsToOrder);
routes.post('/:companyId', sendOrder);

module.exports = routes