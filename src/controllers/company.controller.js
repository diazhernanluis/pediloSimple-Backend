const {registerValidations} = require('../utils/validations');
const companyService = require('../services/company.services');
const log = require('c:/WorkSpace/pediloSimple-Backend/src/config/logger');
const uuid = require('uuid');
const { generarToken } = require('../middlewares/jwt');

//console.log('Log object:', log); // Verifica que el objeto log se importe correctamente
console.log('Log info function:', typeof log.info);
log.info('This is a test info message from company.controller.js');

const getAllCompanies = async (req, res) => {
    const result = await getAll();
    res.status(200).send(result);
}

const companyRegister = async (req, res) => {
        console.log(req.body)
        const {email, companyName, password, cuit, telephone, contact, deliveryZone, businessHours, address} = req.body;

         if (!email || !password) {
          return res.status(400).send("Falta algún dato");
        }
      
        try {
          const exists = await companyService.getCompanyByEmail(email);     
          console.log(exists);
      
          //if (exists) {
          //  return res.status(400).send("Usuario ya existente");
          //}
      
          const newCompany = {
            email, 
            companyName, 
            password, 
            cuit, 
            telephone, 
            contact, 
            deliveryZone, 
            businessHours, 
            address
          };
      
          const compania = await companyService.createCompany(newCompany);
          res.status(201).json(compania);
          log.info("Usuario creado");
          res.status(200).send("Usuario creado");

        } catch (error) {
          console.error('Error al registrar la empresa:', error);
          res.status(500).send("Error interno del servidor");
        }
      };

const companyLogin = async(req, res) => {
    const email = req.body.email;
    const password = req.body.password; 
    console.log("estas intentando iniciar sesion")

    try {
        const users = await getUserByEmail(email);
        if (users.password === password) {
            const token = generarToken(password);
            log.info("Contraseña verificada");
            res.setHeader('token', `Bearer ${token}`);
            res.status(200).send("Contraseña verificada");
        } else {
            log.warn("Contraseña incorrecta");
            res.status(404).send("Contraseña incorrecta");
        }
    } catch (error) {
        console.log("error pelotudo")
        log.error("Error al verificar la contraseña", error);
        res.status(500).send("Error del servidor");
    }
}

const updateCompanyInfo = async (req, res) => {
    
    try {
        const companyName = req.body.companyName.toLowerCase();
        const branchOffice = req.body.branchOffice.toLowerCase();
        delete req.body.companyName;
        delete req.body.branchOffice;

        const client = { 
            id:uuid.v4(),
            companyName,
            branchOffice,
            ...req.body,
            creationDate: Date.now(),
            suscribed: false
        };

        if(registerValidations(client)) {
            await company.create(client);
            
            log.info("usuario creado");
            res.status(200).send(client);
        } else {
            log.info("Falla validacion de datos del usuario");
            res.status(400).send("Falta informacion");
        }
    } catch (e) {
        log.error("error: ", e);
        console.error("error: ", e);
        res.status(500).send("Error!");
    }
}


module.exports = {
    getAllCompanies,
    companyLogin,
    companyRegister,
    updateCompanyInfo
}