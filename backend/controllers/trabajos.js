const { response } = require('express');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const Trabajo = require('../models/trabajos');
const Usuario = require('../models/usuarios');

/*
get / 
<-- desde? el salto para buscar en la lista de trabajos
    id? un identificador concreto, solo busca a este
--> devuleve todos los trabajos
*/
const obtenerTrabajos = async(req, res) => {
    // Para paginación y buscador
    const desde = Number(req.query.desde) || 0;
    const registropp = Number(process.env.DOCSPERPAGE);
    const texto = req.query.texto;
    let textoBusqueda = "";
    if (texto) {
        textoBusqueda = new RegExp(texto, "i");
    }
    // Obtenemos el ID de usuario por si quiere buscar solo un trabajo
    const id = req.query.id || "";

    try {

        let trabajos, total;
        // Si ha llegado ID, hacemos el get /id
        if (id) {

            [trabajos, total] = await Promise.all([
                Trabajo.findById(id).populate('autor').populate('titulacion'),
                Trabajo.countDocuments()
            ]);

        }
        // Si no ha llegado ID, hacemos el get / paginado
        else {
            let query = {};
            if (texto) {
                query = {
                    $or: [
                        { autor: textoBusqueda },
                        { titulo: textoBusqueda },
                        { titulacion: textoBusqueda },
                    ],
                };
            }
            [trabajos, total] = await Promise.all([
                Trabajo.find(query).skip(desde).limit(registropp).populate('autor').populate('titulacion'),
                Trabajo.countDocuments(query)
            ]);
        }

        res.json({
            ok: true,
            msg: 'getTrabajos',
            trabajos,
            page: {
                desde,
                registropp,
                total
            }
        });

    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            msg: 'Error obteniendo trabajos'
        });
    }
}

const obtenerTrabajosAluVisibles = async(req, res) => {
    // Para paginación y buscador
    const desde = Number(req.query.desde) || 0;
    const registropp = Number(process.env.DOCSPERPAGE);
    const texto = req.query.texto;
    let textoBusqueda = "";
    if (texto) {
        textoBusqueda = new RegExp(texto, "i");
    }
    const id = req.query.id || "";
    const idToken = req.uidToken;
    const rolToken = req.rolToken;
    let query = {}; // declaramos la query aquí para usarla luego para cada caso

    try {

        let trabajos, total;
        if (id) {
            if (idToken == id) { // Comprobamos que sea un alumno quien cargue sus trabajos
                if (texto) { // si hay texto es que el alumno quiere buscar entre sus trabajos
                    query = {
                        $and: [
                            { visible: true },
                            { autor: idToken },
                            {
                                $or: [
                                    { titulo: textoBusqueda },
                                ],
                            }
                        ]

                    };
                } else { // sino se prepara la query con sus trabajos globales
                    query = {
                        $and: [
                            { visible: true },
                            { autor: idToken },
                        ]

                    };
                }

                [trabajos, total] = await Promise.all([
                    Trabajo.find(query).skip(desde).limit(registropp).populate('autor').populate('titulacion'),
                    Trabajo.find(query).countDocuments()
                ]);
            } else if (rolToken == "ROL_ADMIN") {
                [trabajos, total] = await Promise.all([
                    Trabajo.findById(id).populate('autor').populate('titulacion'),
                    Trabajo.findById(id).countDocuments()
                ]);
            }


        } else if (rolToken == "ROL_ADMIN") {
            if (texto) {
                query = {
                    $and: [
                        { visible: true },
                        {
                            $or: [
                                { autor: textoBusqueda },
                                { titulo: textoBusqueda },
                                { titulacion: textoBusqueda },
                            ],
                        }
                    ]

                };

            }
            [trabajos, total] = await Promise.all([
                Trabajo.populate('autor').populate('titulacion').find(query).skip(desde).limit(registropp),
                Trabajo.countDocuments(query)
            ]);

        } else {
            return res.status(400).json({
                ok: true,
                msg: 'No está autorizado para realizar esta operación'
            });
        }

        res.json({
            ok: true,
            msg: 'getTrabajosAluVisibles',
            trabajos,
            page: {
                desde,
                registropp,
                total
            }
        });

    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            msg: 'Error obteniendo trabajos'
        });
    }
}

const obtenerTrabajosAluNoVisibles = async(req, res) => {
    // Para paginación y buscador
    const desde = Number(req.query.desde) || 0;
    const registropp = Number(process.env.DOCSPERPAGE);
    const texto = req.query.texto;
    let textoBusqueda = "";
    if (texto) {
        textoBusqueda = new RegExp(texto, "i");
    }
    const id = req.query.id || "";
    const idToken = req.uidToken;
    const rolToken = req.rolToken;
    let query = {}; // declaramos la query aquí para usarla luego para cada caso

    try {

        let trabajos, total;
        if (id) {
            if (idToken == id) { // Comprobamos que sea un alumno quien cargue sus trabajos
                if (texto) { // si hay texto es que el alumno quiere buscar entre sus trabajos
                    query = {
                        $and: [
                            { visible: false },
                            { autor: idToken },
                            {
                                $or: [
                                    { titulo: textoBusqueda },
                                ],
                            }
                        ]

                    };
                } else { // sino se prepara la query con sus trabajos globales
                    query = {
                        $and: [
                            { visible: false },
                            { autor: idToken },
                        ]

                    };
                }

                [trabajos, total] = await Promise.all([
                    Trabajo.find(query).skip(desde).limit(registropp).populate('autor').populate('titulacion'),
                    Trabajo.find(query).countDocuments()
                ]);
            } else if (rolToken == "ROL_ADMIN") {
                [trabajos, total] = await Promise.all([
                    Trabajo.findById(id).populate('autor').populate('titulacion'),
                    Trabajo.countDocuments()
                ]);
            }


        } else if (rolToken == "ROL_ADMIN") {
            if (texto) {
                query = {
                    $and: [
                        { visible: true },
                        {
                            $or: [
                                { autor: textoBusqueda },
                                { titulo: textoBusqueda },
                                { titulacion: textoBusqueda },
                            ],
                        }
                    ]

                };

            }
            [trabajos, total] = await Promise.all([
                Trabajo.populate('autor').populate('titulacion').find(query).skip(desde).limit(registropp),
                Trabajo.countDocuments(query)
            ]);

        } else {
            return res.status(400).json({
                ok: true,
                msg: 'No está autorizado para realizar esta operación'
            });
        }


        res.json({
            ok: true,
            msg: 'getTrabajosAluNoVisibles',
            trabajos,
            page: {
                desde,
                registropp,
                total
            }
        });

    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            msg: 'Error obteniendo trabajos'
        });
    }
}

/*
post / 
<-- comprobar campos requeridos
--> trabajo registrado
*/
const crearTrabajo = async(req, res = response) => {

    const idToken = req.uidToken;
    const rolToken = req.rolToken;

    try {

        // Comrprobar que no existe un usuario con ese email registrado
        const usu = await Usuario.findById(idToken);

        // Vamos a tomar todo lo que nos llega por el req.body excepto el alta, ya que la fecha de alta se va a signar automáticamente en BD
        const { alta, ...object } = req.body;
        const trabajo = new Trabajo(object);

        // Almacenar en BD
        await trabajo.save();

        res.json({
            ok: true,
            msg: 'crearTrabajo',
            trabajo,
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Error creando trabajo'
        });
    }
}

/*
put /:id
<-- nombre, apellidos, email, rol   
--> usuario actualizado
*/

const actualizarTrabajo = async(req, res = response) => {

    const {...object } = req.body;
    const uid = req.params.id;
    const idToken = req.uidToken;
    const rolToken = req.rolToken;
    var ObjectId = require('mongodb').ObjectId;

    try {

        const usu = await Usuario.findById(idToken);
        let trabajo = await Trabajo.findById(uid);
        //comprobamos que ese trabajo sea suyo
        if (trabajo.autor != ObjectId(usu._id).toString()) {
            return res.status(400).json({
                ok: true,
                msg: 'El usuario no es el autor del trabajo'
            });
        }


        trabajo = await Trabajo.findByIdAndUpdate(uid, object, { new: true });

        res.json({
            ok: true,
            msg: 'Trabajo actualizado',
            trabajo
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Error actualizando trabajo'
        });
    }

}

const limpiarMultimediaTrabajo = async(req, res = response) => {

    const uid = req.params.id;
    const idToken = req.uidToken;
    const rolToken = req.rolToken;
    var ObjectId = require('mongodb').ObjectId;

    try {

        const usu = await Usuario.findById(idToken);
        let trabajo = await Trabajo.findById(uid);
        //comprobamos que ese trabajo sea suyo
        if (trabajo.autor != ObjectId(usu._id).toString()) {
            return res.status(400).json({
                ok: true,
                msg: 'El usuario no es el autor del trabajo'
            });
        }


        trabajo.imagenes = [];
        trabajo.videos = [];
        trabajo.documentos = [];
        trabajo.audios = [];

        await trabajo.save();

        res.json({
            ok: true,
            msg: 'Contenidos multimedia del trabajo limpiados',
            trabajo
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Error actualizando trabajo'
        });
    }

}

/*
delete /:id
--> OK si ha podido borrar
*/
const borrarTrabajo = async(req, res = response) => {

    const uid = req.params.id;
    const idToken = req.uidToken;
    const rolToken = req.rolToken;

    try {
        // Comprobamos si existe el usuario que queremos borrar
        const trabajo = await Trabajo.findById(uid);
        if (!trabajo) {
            return res.status(400).json({
                ok: true,
                msg: 'El trabajo no existe'
            });
        }
        // Lo eliminamos y devolvemos el usuaurio recien eliminado
        const resultado = await Trabajo.findByIdAndRemove(uid);

        res.json({
            ok: true,
            msg: 'Trabajo eliminado',
            resultado: resultado
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: true,
            msg: 'Error borrando trabajo'
        });
    }
}


module.exports = { obtenerTrabajos, obtenerTrabajosAluVisibles, obtenerTrabajosAluNoVisibles, crearTrabajo, actualizarTrabajo, limpiarMultimediaTrabajo, borrarTrabajo }