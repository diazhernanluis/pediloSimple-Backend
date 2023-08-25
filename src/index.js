require("dotenv").config();
const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const { server, mongo } = require('./config/config');
const helmet = require('helmet');
const pkg = require("./package.json");
const { log } = require('./config/logger');
const cors = require('cors');

//Start Express-js.
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// app.use(require('express-uncapitalize')());

app.use(routes);

app.listen( server.port, async () => {
    await mongoose.connect(mongo.cs);
    console.log(`ᕕ(ಠ‿ಠ)ᕗ ${pkg.name} - Running on port: ${server.port}`);
});