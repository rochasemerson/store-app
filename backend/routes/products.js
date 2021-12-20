const express = require('express')
const router = express.Router()

const {getAllProducts, createProduct, getProductByCategory, getSingleProduct, updateProduct, deleteProduct, getProductByTag} = require('../controllers/products')

router.route('/').get(getAllProducts).post(createProduct)
router.route('/search').get(getProductByTag)
router.route('/category/:cat').get(getProductByCategory)
router.route('/:id').get(getSingleProduct).patch(updateProduct).delete(deleteProduct)

module.exports = router