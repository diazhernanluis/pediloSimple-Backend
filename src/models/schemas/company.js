const mongoose = require('mongoose');
const companyCollection = 'company';

const companySchema = new mongoose.Schema({
    mail: { type: String, required: true},
    password: { type: String, required: true},
    enabled: {type: Boolean, default: false},
    companyName: { type: String, required: true},
    branchOffice: { type: String},
    cuit: { type: String, required: true, unique: true},
    telephone: { type: String, required: true},
    contact: { type: String, required: true},
    creationDate: {type: Date},
    suscribed: {type: Boolean},
    logo: { type: String, required: false},
    deliveryZone: { type: String},
    businessHours: { type: String},
    address: { type: String},
    versionKey: false
});

const company = mongoose.model(companyCollection, companySchema);

module.exports = {
    company
}