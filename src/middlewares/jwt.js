const jwt = require('jsonwebtoken');

const generarToken = (nombre) => {
    return jwt.sign({nombre: nombre}, "palabraUltraSecreta", {expiresIn: '1h'});
};

const auth = (req, res, next) => {

    const token = req.headers['x-access-token'] || req.headers['authorization'];

    console.log(token);

    if(!token ){
        return res.status(401).send('Acceso no permitido');
    } else {
        try {
            const decoded = jwt.verify(token, "palabraUltraSecreta");
            console.log(decoded);
            req.user = decoded;
            next();
        } catch (e) {
            console.log("Error: ", e);
            return res.status(500).send('Error en el servidor');
        }
    }
}

module.exports = {
    generarToken,
    auth
};