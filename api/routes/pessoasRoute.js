const { Router } = require('express');
const PersonController = require('../controllers/PersonController')

const router = Router()

router
    .get('/buscar/:save?', PersonController.searchByName)
    .get('/listar', PersonController.listAll)

module.exports = router