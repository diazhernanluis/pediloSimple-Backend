const routes = require('express').Router();
const {getClient, createClient, updateClient} = require('../controllers/clients');

routes.get('/ping', (req, res) => {
    console.info({ url: req.url, method: req.method});
    res.status(200).send("pong");
});

routes.get('/', getClient);
routes.post('/', createClient);
routes.post('/update', updateClient);

module.exports = routes