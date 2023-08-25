const { mongo } = require('../config/config');
const db = {};
let isConnectedDB = false;

const connectDB = async () => {
    await mongoose.connect(mongo.cs);
};

module.exports = {

    connectDB,
};
