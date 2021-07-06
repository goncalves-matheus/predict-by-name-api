const database = require('../models')
const PersonSecurity = require('../security/PersonSecurity')
const personSecurity = new PersonSecurity()

class RegisterService {
    async save(dados){
        dados.senha = await personSecurity.addPassword(dados.senha)
        return database.Cadastros.create(dados)
    }
    async getAll(){
        return database.Cadastros.findAll()
    }

    async findByEmail(email) {
        return database.Cadastros.findOne({ where: { email: email } })
    }

    async findById(id) {
        return database.Cadastros.findOne({ where: { id: id } })
    }
}

module.exports = RegisterService