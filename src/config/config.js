let config = {};

config.mongo = {
    cs : process.env.CS,
};

config.server = {
    port: process.env.PORT,
}

module.exports = {
    ...config
}