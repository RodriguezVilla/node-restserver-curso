const express = require('express');

const { verificaToken } = require('../middlewares/autenticacion');

let app = express();
let Producto = require('../models/producto');

//==============================
// Obtener todos los productos
//==============================
app.get('/productos', verificaToken, (req, res) => {
    // Trae todos los productos
    // Populate: usuario y categoria
    // Paginado
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);



    Producto.find({ disponible: true })
        .skip(desde)
        .limit(limite)
        .sort('nombre')
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, productos) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                productos
            })
        })

});


//==============================
// Obtener un producto por ID
//==============================
app.get('/productos/:id', verificaToken, (req, res) => {
    // Populate: usuario y categoria
    let id = req.params.id;

    Producto.findById(id)
        .populate('usuario', 'nombre email img')
        .populate('categoria', 'descripcion')
        .exec((err, productoDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            if (!productoDB) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                productoDB
            })
        });

});

//==============================
// Buscar Productos
//==============================
app.get('/productos/buscar/:termino', verificaToken, (req, res) => {

    let termino = req.params.termino;

    let regex = new RegExp(termino, 'i');

    Producto.find({ nombre: regex /*, disponible: true */ })
        .populate('categoria', 'descripcion')
        .exec((err, productos) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                productos
            })
        })

});


//==============================
// Crear un nuevo producto
//==============================
app.post('/productos', verificaToken, (req, res) => {
    // Grabar el usuario
    // Grabar una categoria del listado
    let body = req.body;

    let producto = new Producto({
        usuario: req.usuario._id,
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria
    });

    producto.save((err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.status(201).json({
            ok: true,
            producto: productoDB
        })
    });
});

//==============================
// Actualizar el producto
//==============================
app.put('/productos/:id', verificaToken, (req, res) => {
    // Grabar el usuario
    // Grabar una categoria del listado
    let id = req.params.id;
    let body = req.body;

    let actulizacionProducto = {
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        categoria: body.categoria,
        disponible: body.disponible
    }

    Producto.findById(id, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        if (!productoDB) {
            return status(400).json({
                ok: false,
                err: {
                    message: 'El ID no existe'
                }
            })
        }

        productoDB.nombre = body.nombre;
        productoDB.precioUni = body.precioUni;
        productoDB.descripcion = body.descripcion;
        productoDB.categoria = body.categoria;
        productoDB.disponible = body.disponible;

        productoDB.save((err, productoGuardado) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.status(201).json({
                ok: true,
                producto: productoGuardado
            });
        });


    });
});

//==============================
// Borrar un producto
//==============================
app.delete('/productos/:id', verificaToken, (req, res) => {
    // No borrar realmente cambiar estado disponible
    let id = req.params.id;

    Producto.findById(id, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'ID no disponible'
                }
            });
        }

        productoDB.disponible = false;

        productoDB.save((err, productoBorrado) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                producto: productoBorrado,
                message: 'Producto eliminado'
            })
        })
    });
});



module.exports = app;