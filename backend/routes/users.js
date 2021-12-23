const express = require('express')
const router = express.Router()

const {getAllUsers, createUser, updateUser, deleteUser, getSingleUser, getUsersByTag} = require('../controllers/users')

router.route('/').get(getAllUsers).post(createUser)
router.route('/:id').get(getSingleUser).patch(updateUser).delete(deleteUser)
router.route('/search').get(getUsersByTag)

module.exports = router