const mongoose = require('mongoose');
const config = require('./config');
const log = require('./logger');

const connection = async () => {
    try {
        await mongoose.connect(config.db.cs);
        log.info("MongoDb - established connection");
    } catch (e) {
        log.error("Error: ", e);
    }
}

module.exports = {
    connection
}