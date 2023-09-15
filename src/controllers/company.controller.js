const {registerValidations} = require('../utils/validations');
const {getAll, getCompanyByEmail, createCompany, updateCompanyById} = require('../services/company.services');
const log = require('../config/logger');
const uuid = require('uuid');
const { generarToken } = require('../middlewares/jwt');

/*
    La idea es que el local se pueda registrar solo con mail y password.
    Una vez registrado pueda armar toda su pagina con imagenes y productos.
    Haciendolo en dos pasos no obligamos a hacer todo de una al local

    Cree el booleano Enabled para chequear si el local esta listo o no para operar,
    tambien nos va a servir para desactivarlo si no quiere mas el servicio o deja de pagar
*/
const getAllCompanies = async (req, res) => {
    const result = await getAll();
    res.status(200).send(result);
}

const companyRegister = async (req, res) => {
    const {email, password} = req.body;
    if( !email || !password) {
        return res.status(400).send("falta algun dato");
    }

    const exists = await getUserByEmail(email);
    if(exists) {
        return res.status(400).send("Usuario ya existente");
    }

    // hashear password - hay problemas con bcrypt en windows
    const newCompany = {
        email,
        password
    };

    const token = generarToken(email);
    await createCompany(newCompany);
    log.info("Usuario creado");
    res.setHeader('Authorization', `Bearer ${token}`);
    res.status(200).send("Usuario creado");
}

const companyLogin = async(req, res) => {
    const users = await getUserByEmail(email);
    if( users.password === password){
        const token = generarToken(password)
        log.info("Contraseña verificada");
        res.setHeader('token', `Bearer ${token}`);
        res.status(200).send("Contraseña verificada");
    } else {
        log.info("Error 404 : no se encontro");
        res.status(404).send("Contraseña incorrecta");       
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