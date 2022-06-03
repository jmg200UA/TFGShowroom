/*
Ruta base: /api/trabajos
*/

const { Router } = require('express');
const { obtenerTrabajos, crearTrabajo, actualizarTrabajo, borrarTrabajo } = require('../controllers/trabajos');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos');
const { validarRol } = require('../middleware/validar-rol');
const { validarJWT } = require('../middleware/validar-jwt');

const router = Router();

router.get('/', [
    validarJWT,
    // Campos opcionales, si vienen los validamos
    check('id', 'El id de usuario debe ser válido').optional().isMongoId(),
    check('desde', 'El desde debe ser un número').optional().isNumeric(),
    validarCampos,
], obtenerTrabajos);

router.post('/', [
    validarJWT,
    //definir los campos que serian obligatorios para el registro del trabajo
    // check('nombre', 'El argumento nombre es obligatorio').not().isEmpty().trim(),
    // check('apellidos', 'El argumento apellidos es obligatorio').not().isEmpty().trim(),
    // check('email', 'El argumento email debe ser un email').isEmail(),
    // check('password', 'El argumento password es obligatorio').not().isEmpty(),
    // // campos que son opcionales que vengan pero que si vienen queremos validar el tipo
    // check('activo', 'El estado activo debe ser true/false').optional().isBoolean(),
    validarCampos,
    validarRol,
], crearTrabajo);

router.put('/:id', [
    validarJWT,
    // definir los campos que deberian ser obligatorios
    check('id', 'El identificador no es válido').isMongoId(),
    // campos que son opcionales que vengan pero que si vienen queremos validar el tipo
    validarCampos,
    validarRol,
], actualizarTrabajo);

router.delete('/:id', [
    validarJWT,
    check('id', 'El identificador no es válido').isMongoId(),
    validarCampos
], borrarTrabajo);


module.exports = router;