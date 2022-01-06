const express = require('express')
const router = express.Router()
const {authentication} = require('../config/passport')
const admin = require('../config/admin')


const {getAllProducts, createProduct, getProductByCategory, getSingleProduct, updateProduct, deleteProduct, getProductByTag} = require('../controllers/products')

router.route('/').post(authentication()).get(getAllProducts).post(admin(createProduct))
router.route('/search').get(getProductByTag)
router.route('/category/:cat').get(getProductByCategory)
router.route('/:id').all(authentication()).get(getSingleProduct).patch(admin(updateProduct)).delete(admin(deleteProduct))

module.exports = router