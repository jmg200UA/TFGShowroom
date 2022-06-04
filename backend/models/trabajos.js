const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    titulo: {
        type: String,
        require: true
    },
    autor: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    resumen: {
        type: String,
        require: true
    },
    imagen: {
        type: String,
    },
    area: { // area de conocimiento
        type: String,
        require: true
    },
    carrera: {
        type: String,
        require: true
    },
    alta: {
        type: Date,
        default: Date.now
    },
    director: { //director de investigación
        type: String,
        require: true
    },
    valoracion: {
        type: Number,
        default: true
    },
    multimedia: [{
        type: String,
    }],
}, { collection: 'trabajos' });

UsuarioSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();

    object.uid = _id;
    return object;
})

module.exports = model('Trabajo', UsuarioSchema);