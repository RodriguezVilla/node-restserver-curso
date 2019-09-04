const jwt = require('jsonwebtoken');

// =======================
// 
// =======================



// =======================
// Verificar Token
// =======================
let verificaToken = (req, res, next) => {
    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no valido',
                    err
                }
            });
        }

        req.usuario = decoded.usuario;
        next(); //El next tiene que estar dentro de la verificación para asegurarnos que el token siempre es valido y no mostrar la información si no lo es  
    });
};


// =======================
// Verifica AdminRole
// =======================
let verificaAdmin_Role = (req, res, next) => {
    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {

        return res.json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        });
    }


}

// =======================
// Verifica Token para Imagen
// =======================
let verificaTokenImg = (req, res, next) => {

    let token = req.query.token;


    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no valido',
                    err
                }
            });
        }

        req.usuario = decoded.usuario;
        next(); //El next tiene que estar dentro de la verificación para asegurarnos que el token siempre es valido y no mostrar la información si no lo es  
    });


}


module.exports = {
    verificaToken,
    verificaAdmin_Role,
    verificaTokenImg
};