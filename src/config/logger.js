const winston = require('winston');

const customLevelOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        debug: 4
    },
    colors: {
        fatal: 'red',
        error: 'magenta',
        warning: 'yellow',
        info: 'blue',
        debug: 'white'
    }
};

winston.addColors(customLevelOptions.colors);

const log = winston.createLogger({
    levels: customLevelOptions.levels,
    format: winston.format.combine(
        winston.format.colorize({ colors: customLevelOptions.colors }),
        winston.format.simple()
    ),
    transports: [
        new winston.transports.Console({
            level: 'debug' // Cambia el nivel aquí si deseas ver todos los niveles de log en la consola
        })
    ]
        // new winston.transports.File({
        //     filename: 'logs/errors.log',
        //     level: 'warning',
        //     format: winston.format.simple()
        // })
})

module.exports = log;