const express = require("express");
const { notFound } = require("../middlewares");
const router = express.Router();

router.get('/ping', (req, res) => {
    console.info({ url: req.url, method: req.method});
    res.status(200).send("pong");
});

const clients = require("./company.router");
const orders = require("./orders.router");
const products = require("./products.router");

// Routes
router.use("/orders", orders);
router.use("/clients", clients);
router.use("/products", products);

router.all("*", notFound);

module.exports = router;