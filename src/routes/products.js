const routes = require('express').Router();
const { log } = require('../config/logger');
const { getCompanyProducts, addCompanyProducts } = require('../controllers/products');

const auth = (req, res, next) => {
    log.warn("Should be secure");
    next();
}

// ************------------********************** */
// REQUIEREN LOGUEO PARA CHEQUEAR QUE ES LA EMPRESA
// ************------------********************** */

// retorna toda la lista de productos que esa empresa tiene cargados.
// Basicamente toda la configuracion de lo que va a ver el cliente de ese local
routes.get('/:companyName/admin', auth, getCompanyProducts);


// endpoint donde agrega productos la empresa
routes.post('/:companyName/admin', auth, addCompanyProducts);





module.exports = routes