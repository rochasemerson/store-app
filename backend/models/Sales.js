const mongoose = require('mongoose')

const SalesSchema = new mongoose.Schema({
    id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    client: {
        type: String,
        required: true,
    },
    clientEmail: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    }
})

export default new mongoose.model('Sales', SalesSchema)