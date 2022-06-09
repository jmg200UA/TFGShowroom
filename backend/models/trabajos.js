const { Schema, model } = require('mongoose');

const TrabajoSchema = Schema({
    titulo: {
        type: String,
        require: true
    },
    autor: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    },
    resumen: {
        type: String,
        require: true
    },
    imagen: {
        type: String,
    },
    area: { // area de conocimiento
        type: String, // comprobar por middleware segun la carrera
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
        type: Number
    },
    multimedia: [{
        type: String,
    }],
    titulacion: {
        type: String,
        require: true
    },
}, { collection: 'trabajos' });

TrabajoSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();

    object.uid = _id;
    return object;
})

module.exports = model('Trabajo', TrabajoSchema);