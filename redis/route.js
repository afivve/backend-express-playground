const express = require('express')
const controller = require('./controller')
const router = express.Router()

router.get('test', (req, res) => res.status(200).json('ok'))
router.get('/getSpecies/:idSpecies', controller.getSpeciesPokemon)

module.exports = router