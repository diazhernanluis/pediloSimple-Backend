const {company} = require('../models/schemas/company.js');

const getAll = async () => await company.find();

const getCompanyByEmail = async (email) => await company.findOne({email: email});

const getCompanyById = async (uuid) => await company.findOne({uuid: uuid})

const createCompany = async (info) => await company.create(info);

const updateCompanyById = async (id, info) => await company.updateOne({_id: id}, { $set: info});

const deleteAll = () => company.deleteMany({});

module.exports = {
    getAll,
    getCompanyByEmail,
    getCompanyById,
    createCompany,
    updateCompanyById,
    deleteAll
}