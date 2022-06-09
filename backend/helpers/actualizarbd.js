const Usuario = require('../models/usuarios');
const fs = require('fs');
const { infoToken } = require('../helpers/infotoken');

const actualizarBD = async(tipo, path, nombreArchivo, id, token) => {
    let fotoAntigua, pathFotoAntigua;
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

            // Comprobar que el id de usuario es un admin
            // if (infoToken(token).rol !== "ROL_ADMIN") {
            //     console.log('no tienes permisos de admin')
            //     return false;
            // }

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

            // Comprobar que el id de usuario que actualiza es el mismo id del token
            // solo el usuario puede cambiar su foto
            if (infoToken(token).uid !== id) {
                console.log('el usuario que actualiza no es el propietario del trabajo')
                return false;
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

        default:
            return false;
            break;
    }

    console.log(tipo, path, nombreArchivo, id);
}

module.exports = { actualizarBD }