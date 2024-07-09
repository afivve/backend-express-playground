const express = require('express')
const controller = require('./controller')
const router = express.Router()

router.get('/getSpecies/:idSpecies', controller.getSpeciesPokemon)
router.get('/users', controller.getUsers)
router.get('/users/:userId', controller.getUserById)

module.exports = router