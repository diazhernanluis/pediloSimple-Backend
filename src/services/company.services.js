const {company} = require('../models/schemas/company');

const getAll = async () => {
  try {
    return await Company.find();
  } catch (error) {
    console.error('Error al obtener todas las empresas:', error);
    throw error; 
  }
};

const getCompanyByEmail = async (email) => {
  try {
    return await company.findOne({ email: email });
  } catch (error) {
    console.error('Error al obtener empresa por email:', error);
    throw error; 
  }
};

const createCompany = async (info) => {
  try {
    return await company.create(info);
  } catch (error) {
    console.error('Error al crear empresa:', error);
    throw error; 
  }
};

const updateCompanyById = async (id, info) => {
  try {
    return await company.updateOne({ _id: id }, { $set: info });
  } catch (error) {
    console.error('Error al actualizar empresa por ID:', error);
    throw error;
  }
};

module.exports = {
  getAll,
  getCompanyByEmail,
  createCompany,
  updateCompanyById
};
