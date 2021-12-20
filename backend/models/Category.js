const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    description: {
        type:String,
        required:[true, 'Descrição não informada']
    },
    code: {
     type:Number,
     required:[true, 'Código não informado']
    }
})

module.exports = mongoose.model('Category', categorySchema)