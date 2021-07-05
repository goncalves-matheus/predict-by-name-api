const { Router } = require('express');
const PersonController = require('../controllers/PersonController')



const router = Router()

router
    .get('/Pessoas', PersonController.test)
    .get('/buscar', PersonController.searchByName)

module.exports = router