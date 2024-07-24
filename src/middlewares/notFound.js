const log = require('c:/WorkSpace/pediloSimple/Backend/src/config/logger');
/**
 * Not found controller.
 * @param {object} req request object.
 * @param {object} res response object.
 */
const notFound = (req, res) => {
    log.info({ url: req.url, method: req.method, message: 'Not found' });
    res.status(404).json({ error: 'Route not found.' });
};

module.exports = { notFound };
