const express = require('express')
const app = express()
const connectDB = require('./db/connect')
const products = require('./routes/products')
const categories = require('./routes/categories')
const clients = require('./routes/clients')
require('dotenv').config()

// middlewares
app.use(express.json())

// routes
app.use('/api/products', products)
app.use('/api/categories', categories)
app.use('/api/clients', clients)

const start = async () => {
    try {
        await connectDB(process.env.MONGOURI)
        app.listen(5000, (req, res) => {
            console.log('Server listening on port 5000...')
        })
    } catch (error) {
        console.log(error);
    }
}

start()