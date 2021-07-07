require('dotenv').config()
const express = require('express')
const routes = require('./routes')
const { authenticationStrategies } = require('../api/security')
const app = express()

const port = process.env.PORT

routes(app)

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`))

module.exports = app
