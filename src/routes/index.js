const express = require("express");
const router = express.Router();

const { notFound } = require("../middlewares");
const clients = require("./clients");
const orders = require("./orders");
const products = require("./products");

// Routes
router.use("/", orders);
router.use("/clients", clients);
router.use("/products", products);

router.all("*", notFound);

module.exports = router;