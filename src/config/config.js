let config = {};

config.db = {
    cs : process.env.CS,
};

config.server = {
    port: process.env.PORT,
}

module.exports = {
    ...config
}