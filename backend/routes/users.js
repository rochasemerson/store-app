const express = require('express')
const router = express.Router()

const {getAllUsers, createUser, updateUser, deleteUser, signIn, validateToken, getUsersByTag} = require('../controllers/users')

router.route('/signup').post(createUser)
router.route('/signin').post(signIn)
router.route('/validateToken').post(validateToken)
router.route('/').get(getAllUsers).post(createUser)
router.route('/:id').patch(updateUser).delete(deleteUser)
router.route('/search').get(getUsersByTag)

module.exports = router