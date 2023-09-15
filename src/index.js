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

//Start Express-js.
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/v1', routes);

app.listen( server.port, async () => {
    await connection();
    log.info(`ᕕ(ಠ‿ಠ)ᕗ ${pkg.name} - Running on port: ${server.port}`);
});