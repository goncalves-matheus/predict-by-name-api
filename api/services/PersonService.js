const database = require('../models')

class PersonService {
    async save(dados){
        return database.Pessoas.create(dados)
    }
    async getAll(){
        return database.Pessoas.findAll()
    }
}

module.exports = PersonService