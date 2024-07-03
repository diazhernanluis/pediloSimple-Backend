const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY || 'your-secret-key';

const generarToken = (email) => {
  return jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
};

module.exports = {
  generarToken
};
