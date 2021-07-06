const { Router } = require('express');
const RegisterController = require('../controllers/RegisterController')
const middlewaresAuthentication = require('../security/middlewares-authentication')

const router = Router()

router
    .post('/cadastro', RegisterController.register)
    .post('/login', middlewaresAuthentication.local, RegisterController.login)

module.exports = router