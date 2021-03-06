const express = require('express')
const app = express()
const cors = require('cors')
const connectDB = require('./db/connect')
const products = require('./routes/products')
const categories = require('./routes/categories')
const users = require('./routes/users')
const passport = require('passport')

require('dotenv').config()

// middlewares
app.use(express.json())
app.use(cors())
app.use(passport.initialize())

// routes
app.use('/api/products', products)
app.use('/api/categories', categories)
app.use('/api/users', users)

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