const pino = require('pino');


const log = pino({
    transport: {
        target: "pino-pretty",
        options: {
            ignore: "pid,hostname",
        },
    }
})

module.exports = {
    log
}