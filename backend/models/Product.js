const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    description: {
        type: String,
        required: [true, 'Descrição não informada'],
        unique: [true],
        trim: true
    },
    price: {
        type: Number,
        get: value => (value/100).toFixed(2),
        set: value => value*100,
        required: [true, 'Preço não informado'],  
    },
    stock: {
        type: Number,
        required: [true, 'Estoque não informado']
    },
    category: {
        type: Number,
        required: [true, 'Categoria não informada']
    },
    profit: Number,
    imgUrl: String
})

productSchema.set('toJSON', {getters: true})

module.exports = mongoose.model('Product', productSchema)