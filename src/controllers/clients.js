const { company } = require('../models/company');
const uuid = require('uuid');
const { log } = require('../config/logger');

const getClient = async (req, res) => {
    const result = await company.find();
    res.status(200).send(result);
}

const createClient = async (req, res) => {
    
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
        
        await company.create(client);
        
        log.info("usuario creado");
        res.status(200).send(client);
    } catch (e) {
        log.error("error: ", e);
        console.error("error: ", e);
        res.status(500).send("Error!");
    }
}

const updateClient = (req, res) => {
    res.status(200).send('getClient');
}

module.exports = {
    getClient,
    createClient,
    updateClient
}