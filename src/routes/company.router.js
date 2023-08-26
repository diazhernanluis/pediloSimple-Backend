const routes = require('express').Router();
const {getAllCompanies, companyRegister, updateCompanyInfo} = require('../controllers/company.controller');


routes.get('/', getAllCompanies); //este va a ser un endpoint nuestro para chequear, probablemente mas adelante lo eliminemos
routes.post('/register', companyRegister); 
routes.post('/update', updateCompanyInfo);

module.exports = routes