const mongoose = require('mongoose');
const companyCollection = 'company';

const companySchema = new mongoose.Schema({
    id: { type: String, required: true},
    companyName: { type: String, required: true},
    branchOffice: { type: String, required: true},
    cuit: { type: String, required: true, unique: true},
    telephone: { type: String, required: true},
    mail: { type: String, required: true},
    contact: { type: String, required: true},
    creationDate: {type: Date, required: true},
    suscribed: {type: Boolean, required: true},
    logo: { type: String, required: false},
    deliveryZone: { type: String, required: false},
    horario: { type: String, required: false},
    address: { type: String, required: false},
    versionKey: false
});

const company = new mongoose.model(companyCollection, companySchema);

module.exports = {
    company
}