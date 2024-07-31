const {registerValidations} = require('../utils/validations');
const companyService = require('../services/company.services');
const log = require('c:/WorkSpace/pediloSimple/Backend/src/config/logger');
const { v4: isUuid }  = require('uuid');
const { generarToken } = require('../middlewares/jwt');

const getAllCompanies = async (req, res) => {
    const result = await getAll();
    res.status(200).send(result);
}

const getCompany = async (req, res) => {
    const { companyId } = req.params;
    console.log('companyId :', companyId);
  
    // Validar que el UUID sea válido
    if (!isUuid(companyId)) {
      return res.status(400).json({ error: 'UUID inválido' });
    }
  
    try {
      const result = await companyService.getCompanyById(companyId);
  
      // Verificar si se encontró la compañía
      if (!result) {
        return res.status(404).json({ error: 'Compañía no encontrada' });
      }
  
      console.log('resultado :', result);
      res.status(200).json(result);
    } catch (error) {
      console.error('Error al obtener la compañía:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
};

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

const companyLogin = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;     
    
    try {
        // Obtener la compañía por correo electrónico
        const company = await companyService.getCompanyByEmail(email);

        // Verificar la contraseña
        if (company.password === password) {
            const token = generarToken(password);
            log.info("Contraseña verificada");
             // Enviar el token en el encabezado y el companyId en la respuesta
            res.setHeader('token', `Bearer ${token}`);
            res.status(200).json({ 
                message: "Contraseña verificada", 
                companyId: company.uuid // Incluye el ID de la compañía en la respuesta
            });
        } else {
            log.warn("Contraseña incorrecta");
            res.status(401).json({ message: "Contraseña incorrecta" }); // Código de estado 401 para credenciales inválidas
        }
        } catch (error) {
            log.error("Error al verificar la contraseña", error);
            res.status(500).json({ message: "Error del servidor" });
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
    getCompany,
    companyLogin,
    companyRegister,
    updateCompanyInfo
}