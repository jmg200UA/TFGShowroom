const Usuario = require('../models/usuarios');
const Titulacion = require('../models/titulaciones');
const Trabajo = require('../models/trabajos');
const fs = require('fs');
const { infoToken } = require('../helpers/infotoken');

const actualizarBD = async(tipo, path, nombreArchivo, id, token) => {
    let fotoAntigua, pathFotoAntigua;
    const idToken = req.uidToken;
    const rolToken = req.rolToken;
    //Comprobar que el trabajo sea suyo
    let usuario = await Usuario.findById(idToken);
    if (!usuario) return false;
    console.log("Tipo que llega para actualizar: ", tipo);
    switch (tipo) {

        case 'fotoperfil':

            const usuariofoto = await Usuario.findById(id);
            if (!usuariofoto) {
                return false;
            }

            // Comprobar que el id de usuario que actualiza es el mismo id del token
            // solo el usuario puede cambiar su foto
            if (infoToken(token).uid !== id) {
                console.log('el usuario que actualiza no es el propietario de la foto')
                return false;
            }

            fotoAntigua = usuario.imagen;
            pathFotoAntigua = `${path}/${fotoAntigua}`;
            if (fotoAntigua && fs.existsSync(pathFotoAntigua)) {
                fs.unlinkSync(pathFotoAntigua);
            }

            usuariofoto.imagen = nombreArchivo;
            await usuariofoto.save();

            return true;

            break;

        case 'titulacionimg':

            const titulacionfoto = await Titulacion.findById(id);
            if (!titulacionfoto) {
                return false;
            }
            console.log("Aqui se llega");

            //Comprobar que el id de usuario es un admin
            if (infoToken(token).rol !== "ROL_ADMIN") {
                console.log('no tienes permisos de admin')
                return false;
            }

            fotoAntigua = titulacionfoto.imagen;
            pathFotoAntigua = `${path}/${fotoAntigua}`;
            if (fotoAntigua && fs.existsSync(pathFotoAntigua)) {
                fs.unlinkSync(pathFotoAntigua);
            }

            titulacionfoto.imagen = nombreArchivo;
            await titulacionfoto.save();

            return true;

            break;

        case 'trabajoimg':

            const trabajofoto = await Trabajo.findById(id);
            if (!trabajofoto) {
                return false;
            }

            if (trabajofoto.autor != usuario.uid) {
                console.log("el usuario no es el propietario del trabajo que quiere actualizar");
            }

            fotoAntigua = trabajofoto.imagen;
            pathFotoAntigua = `${path}/${fotoAntigua}`;
            if (fotoAntigua && fs.existsSync(pathFotoAntigua)) {
                fs.unlinkSync(pathFotoAntigua);
            }

            trabajofoto.imagen = nombreArchivo;
            await trabajofoto.save();

            return true;

            break;

        case 'trabajoimgs':

            const trabajofotos = await Trabajo.findById(id);
            if (!trabajofotos) {
                return false;
            }

            if (trabajofotos.autor != usuario.uid) {
                console.log("el usuario no es el propietario del trabajo que quiere actualizar");
            }

            trabajofotos.imagenes.push(nombreArchivo);
            await trabajofotos.save();

            return true;

            break;
        case 'trabajovideos':

            const trabajovideos = await Trabajo.findById(id);
            if (!trabajovideos) {
                return false;
            }

            if (trabajovideos.autor != usuario.uid) {
                console.log("el usuario no es el propietario del trabajo que quiere actualizar");
            }


            trabajovideos.imagenes.push(nombreArchivo);
            await trabajovideos.save();

            return true;

            break;
        case 'trabajoaudios':

            const trabajoaudios = await Trabajo.findById(id);
            if (!trabajoaudios) {
                return false;
            }

            if (trabajoaudios.autor != usuario.uid) {
                console.log("el usuario no es el propietario del trabajo que quiere actualizar");
            }


            trabajoaudios.imagenes.push(nombreArchivo);
            await trabajoaudios.save();

            return true;

            break;
        case 'trabajodocs':

            const trabajodocs = await Trabajo.findById(id);
            if (!trabajodocs) {
                return false;
            }

            if (trabajodocs.autor != usuario.uid) {
                console.log("el usuario no es el propietario del trabajo que quiere actualizar");
            }


            trabajodocs.imagenes.push(nombreArchivo);
            await trabajodocs.save();

            return true;

            break;

        default:
            return false;
            break;
    }

    console.log(tipo, path, nombreArchivo, id);
}

module.exports = { actualizarBD }