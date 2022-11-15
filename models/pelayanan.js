const mongoose = require('mongoose')

const PelayananModel = mongoose.Schema({
    kategori: {
        type: String,
        minLength: 1,
        maxLength: 15,
        required: true,
    },
    nama: {
        type: String,
        minLength: 1,
        maxLength: 70,
        required: true
    },
    npwp: {
        type: String,
        minLength: 1,
        maxLength: 70,
        required: true
    },
    alamat: {
        type: String,
        minLength: 1,
        maxLength: 255,
        required: true
    },
    klu: {
        type: String,
        minLength: 1,
        maxLength: 255,
        required: true
    },
    nik: {
        type: String,
        minLength: 1,
        maxLength: 70,
        required:true
    }, 
    nomorhp: {
        type: String,
        minLength: 1,
        maxLength: 70,
        required: true
    },
    email: {
        type: String,
        maxLength: 70,
    },
    tanggal : {
        type: String,
        required:true,
    },
    loket: {
        type: String,
        minLength: 1,
        maxLength: 40,
        required: true
    },
    penyelesaian: {
        type: String,
        maxLength: 255
    },
    kepentingan: {
        main: {
            type: Array,
        },
        desc: {
            type: String,
            minLength: 0,
            maxLength: 255
        }
    }
}, { collection: 'Pelayanan' })

module.exports = mongoose.model('Pelayanan', PelayananModel)