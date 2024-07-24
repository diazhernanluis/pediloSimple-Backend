const routes = require('express').Router();
const log = require('../config/logger');
const { getCompanyProducts, addCompanyProducts } = require('../controllers/products.controller');

const auth = (req, res, next) => {
    if (typeof log.warning === 'function') {
        log.warning("Should be secure");
    } else {
        console.warning("Logger function 'warning' is not defined");
    }
    next();
}

// Ruta para obtener todos los productos de una compañía
routes.get('/:companyId/admin', auth, getCompanyProducts);

// Ruta para agregar productos a una compañía
routes.post('/:companyId/admin', auth, addCompanyProducts);

module.exports = routes;
