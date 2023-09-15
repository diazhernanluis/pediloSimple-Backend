const mongoose = require('mongoose');
const companyCollection = 'company';

const companySchema = new mongoose.Schema({
    email: { type: String, required: true},
    password: { type: String, required: true},
    enabled: {type: Boolean, default: false},
    companyName: { type: String},
    branchOffice: { type: String},
    cuit: { type: String, unique: true},
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

const company = new mongoose.model(companyCollection, companySchema);

module.exports = {
    company
}