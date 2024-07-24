const routes = require('express').Router();
const {getAllCompanies, companyRegister, updateCompanyInfo, companyLogin} = require('../controllers/company.controller');


routes.get('/', getAllCompanies); //este va a ser un endpoint nuestro para chequear, probablemente mas adelante lo eliminemos
routes.post('/register', companyRegister); 
routes.post('/update', updateCompanyInfo);
routes.post('/login', companyLogin);

module.exports = routes