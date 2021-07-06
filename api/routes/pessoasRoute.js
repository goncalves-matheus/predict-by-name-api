const { Router } = require('express');
const PersonController = require('../controllers/PersonController')
const middlewaresAuthentication = require('../security/middlewares-authentication')

const router = Router()

router
    .get('/buscar/:save?', middlewaresAuthentication.bearer, PersonController.searchByName)
    .get('/listar', middlewaresAuthentication.bearer, PersonController.listAll)

module.exports = router