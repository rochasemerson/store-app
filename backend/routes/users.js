const express = require('express')
const router = express.Router()
const admin = require('../config/admin')

const {authentication} = require('../config/passport')
const {getAllUsers, createUser, updateUser, deleteUser, signIn, validateToken, getUsersByTag} = require('../controllers/users')

router.route('/signin').post(signIn)
router.route('/validateToken').post(validateToken)
router.route('/').get(authentication()).get(admin(getAllUsers)).post(createUser)
router.route('/:id').all(authentication()).patch(updateUser).delete(deleteUser)
router.route('/search').all(authentication()).get(getUsersByTag)

module.exports = router