const database = require('../models')
const RegisterSecurity = require('../security/RegisterSecurity')
const registerSecurity = new RegisterSecurity()

class RegisterService {
    async save(dados){
        dados.senha = await registerSecurity.addPassword(dados.senha)
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