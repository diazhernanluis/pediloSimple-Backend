require("dotenv").config();
const express = require('express');
const routes = require('./routes/index.router');
const mongoose = require('mongoose');
const { server } = require('./config/config');
const helmet = require('helmet');
const pkg = require("./package.json");
const cors = require('cors');
const { connection } = require('./config/DBconnect');
const log = require("./config/logger");
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

//Start Express-js.
const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'))
app.use('/v1', routes);

app.listen( server.port, async () => {
    await connection();
    log.info(`ᕕ(ಠ‿ಠ)ᕗ ${pkg.name} - Running on port: ${server.port}`);
});

// Definir un formato de registro personalizado
morgan.format('custom', ':method :url :status :res[content-length] - :response-time ms');

// Crear un flujo de escritura (write stream) para el archivo de registro
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

// Usar Morgan con el formato personalizado y escribir los registros en el archivo
app.use(morgan('custom', { stream: accessLogStream }));