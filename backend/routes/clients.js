const express = require('express')
const router = express.Router()

const {getAllClients, createClient, updateClient, deleteClient, getSingleClient, getClientsByTag} = require('../controllers/client')

router.route('/').get(getAllClients).post(createClient)
router.route('/:id').get(getSingleClient).patch(updateClient).delete(deleteClient)
router.route('/search').get(getClientsByTag)

module.exports = router