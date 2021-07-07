const database = require('../models')

class PersonService {
    async save(dados){   
        return database.Pessoas.create(dados)
    }

    async getAll(){
        return database.Pessoas.findAll()
    }

    async findByName(name){
        return database.Pessoas.findOne({where: {nome: name}})
    }

    async verifyIfAlreadyExists(name){
        if(await database.pessoas.findByName(name)){
            return true
        }
        return false
    }
}

module.exports = PersonService