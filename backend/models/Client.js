const mongoose = require('mongoose')

const ClientSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: [true, 'Nome não informado'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'E-mail não informado'],
        trim: true
    },
    phone: {
        type: Number,
        required: [true, 'Telefone não informado'],
        min: 12
    },
    password: {
        type: mongoose.Mixed,
        required: [true, 'Senha não informada']
    },
    address: String,
    address_number: Number,
    area: String,
    city: String
})

module.exports = mongoose.model('Client', ClientSchema)