const bodyParser = require('body-parser')
const pessoas = require('./pessoasRoute')
const register = require('./registerRoute')

module.exports = app => {
    app.use(bodyParser.json())
    app.use(pessoas)
    app.use(register)
}