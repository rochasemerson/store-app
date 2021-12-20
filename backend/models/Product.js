const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    description: {
        type: String,
        required: [true, 'Descrição não informada'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Preço não informado']
    },
    stock: {
        type: Number,
        required: [true, 'Estoque não informado']
    },
    category: {
        type: Number,
        required: [true, 'Categoria não informada']
    },
    profit: Number
})

module.exports = mongoose.model('Product', productSchema)