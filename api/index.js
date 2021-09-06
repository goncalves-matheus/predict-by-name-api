require('dotenv').config()
const express = require('express')
const routes = require('./routes')
const { authenticationStrategies } = require('../api/security')
const app = express()

const port = process.env.PORT

const logger = require('./logger')

routes(app)

app.listen(port, () => logger.info(`Servidor rodando na porta ${port}`))

module.exports = app
