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
    url: {
        type: String
    },
    area: { // area de conocimiento
        type: String,
    },
    tipo: { // TFG o TFM segun la titulacion
        type: String,
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
        default: 0
    },

    contenidos: [{
        nombre: {
            type: String,
            default: ''
        },
        tipo: {
            type: String,

        },
        descripcion: {
            type: String,
        },
        url: { // para los videos de youtube
            type: String,
        }
    }],
    // imagenes: [{
    //     type: String,
    // }],
    // videos: [{
    //     type: String,
    // }],
    // audios: [{
    //     type: String,
    // }],
    // documentos: [{
    //     type: String,
    // }],
    titulacion: {
        type: Schema.Types.ObjectId,
        ref: 'Titulacion',
        require: true
    },
    visible: {
        type: Boolean,
        default: false
    },
    estado: { // para editar, pendiente de revisión, aceptado, denergado
        type: String,
        default: "Para editar"
    }
}, { collection: 'trabajos' });

TrabajoSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();

    object.uid = _id;
    return object;
})

module.exports = model('Trabajo', TrabajoSchema);