const express = require('express')
const router = express.Router()
const {authentication} = require('../config/passport')
const admin = require('../config/admin')

const {getCategories, getSingleCategory, createCategory, updateCategory, deleteCategory} = require('../controllers/category')

router.route('/').post(authentication()).get(getCategories).post(admin(createCategory))
router.route('/:code').all(authentication()).get(getSingleCategory).patch(admin(updateCategory)).delete(admin(deleteCategory))

module.exports = router