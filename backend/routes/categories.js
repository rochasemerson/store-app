const express = require('express')
const router = express.Router()

const {getCategories, getSingleCategory, createCategory, updateCategory, deleteCategory} = require('../controllers/category')

router.route('/').get(getCategories).post(createCategory)
router.route('/:id').get(getSingleCategory).patch(updateCategory).delete(deleteCategory)

module.exports = router