const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Nome não informado'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'E-mail não informado'],
        unique: true,
        trim: true,
        lowercase: true,
    },
    phone: {
        type: Number,
        required: [true, 'Telefone não informado'],
        minlength: 12
    },
    password: {
        type: mongoose.Mixed,
        required: [true, 'Senha não informada']
    },
    admin: {
        type: Boolean,
        // required: [true, 'Informe se usuário é administrador']
    },
    address: String,
    address_detail: String,
    area: String,
    city: String
})

module.exports = mongoose.model('User', UserSchema)