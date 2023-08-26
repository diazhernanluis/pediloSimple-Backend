const mongoose = require('mongoose');
const config = require('./config');


const connection = async () => {
    try {
        await mongoose.connect(config.db.cs);
        console.log("MongoDb - established connection");
    } catch (e) {
        console.log("Error: ", e);
    }
}

module.exports = {
    connection
}