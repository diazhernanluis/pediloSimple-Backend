const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const companyCollection = 'company';

const companySchema = new mongoose.Schema({
    uuid: {type: String, default: uuidv4, unique: true},
    email: { type: String, required: true},
    password: { type: String, required: true},
    enabled: {type: Boolean, default: false},
    companyName: { type: String},
    branchOffice: { type: String},
    cuit: { type: String},
    telephone: { type: String},
    contact: { type: String},
    creationDate: {type: Date},
    suscribed: {type: Boolean},
    logo: { type: String},
    deliveryZone: { type: String},
    horario: { type: String},
    address: { type: String},
    versionKey: false
});

const company = mongoose.model(companyCollection, companySchema);

module.exports = {
    company
}