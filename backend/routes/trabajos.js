/*
Ruta base: /api/trabajos
*/

const { Router } = require('express');
const { obtenerTrabajos, obtenerTrabajosAluVisibles, obtenerTrabajosAluNoVisibles, crearTrabajo, actualizarTrabajo, borrarTrabajo, limpiarMultimediaTrabajo, obtenerTrabajosEditor } = require('../controllers/trabajos');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos');
const { validarRol } = require('../middleware/validar-rol');
const { validarRolAdmin } = require('../middleware/validar-rol-admin');
const { validarRolEditor } = require('../middleware/validar-rol-editor');
const { validarJWT } = require('../middleware/validar-jwt');

const router = Router();

router.get('/', [
    validarJWT,
    // Campos opcionales, si vienen los validamos
    check('id', 'El id de usuario debe ser válido').optional().isMongoId(),
    check('desde', 'El desde debe ser un número').optional().isNumeric(),
    validarCampos,
], obtenerTrabajos);

router.get('/tr/', [ // trabajos revisión
    validarJWT,
    // Campos opcionales, si vienen los validamos
    check('id', 'El id de usuario debe ser válido').optional().isMongoId(),
    check('desde', 'El desde debe ser un número').optional().isNumeric(),
    validarCampos,
    validarRolEditor
], obtenerTrabajosEditor);

router.get('/v/', [ // trabajos visibles
    validarJWT,
    // Campos opcionales, si vienen los validamos
    check('id', 'El id de usuario debe ser válido').optional().isMongoId(),
    check('desde', 'El desde debe ser un número').optional().isNumeric(),
    validarCampos,
], obtenerTrabajosAluVisibles);

router.get('/nv/', [ // trabajos no visibles
    validarJWT,
    // Campos opcionales, si vienen los validamos
    check('id', 'El id de usuario debe ser válido').optional().isMongoId(),
    check('desde', 'El desde debe ser un número').optional().isNumeric(),
    validarCampos,
], obtenerTrabajosAluNoVisibles);

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
    validarRolAdmin,
], crearTrabajo);

router.put('/:id', [
    validarJWT,
    // definir los campos que deberian ser obligatorios
    check('id', 'El identificador no es válido').isMongoId(),
    // campos que son opcionales que vengan pero que si vienen queremos validar el tipo
    validarCampos,
    validarRol,
], actualizarTrabajo);

router.put('/lm/:id', [
    validarJWT,
    // definir los campos que deberian ser obligatorios
    check('id', 'El identificador no es válido').isMongoId(),
    // campos que son opcionales que vengan pero que si vienen queremos validar el tipo
    validarCampos,
    validarRol,
], limpiarMultimediaTrabajo);

router.delete('/:id', [
    validarJWT,
    check('id', 'El identificador no es válido').isMongoId(),
    validarCampos,
    validarRolAdmin,
], borrarTrabajo);


module.exports = router;