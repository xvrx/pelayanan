const mongoose = require('mongoose')

const masterfModel = mongoose.Schema({
    NPWP: {
        type: String,
        maxLength: 255,
    },
    NAMA_WP: {
        type: String,
        maxLength: 255,
    },
    NOMOR_IDENTITAS: {
        type: String,
        maxLength: 255,
    },
    ALAMAT: {
        type: String,
        maxLength: 255,
    },
    NAMA_KLU: {
        type: String,
        maxLength: 255,
    },
    KATEGORI: {
        type: String,
        maxLength: 255,
    }, 
    NOMOR_TELEPON: {
        type: String,
        maxLength: 255,
    },
    EMAIL: {
        type: String,
        maxLength: 255,
    },
    KODE_POS : {
        type: String,
        maxLength: 255,
    }
}, { collection: 'masterf' })

module.exports = mongoose.model('masterf', masterfModel)