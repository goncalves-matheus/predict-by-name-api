const { PersonService }  = require('../services')
const { RequestService } = require('../services')
const logger = require('../../logger')

const personService = new PersonService()

class PersonController {
    
    static async searchByName(req,res){
        logger.debug(`Requisição GET buscando por ${req.body.nome}`)
        try {
            const name = req.body.nome
            if (!name) {
                throw new Error("O nome não pode estar vazio")
            }
            const personData = await PersonController._findAPersonDataByName(name)
            PersonController._wantToSave(req, personData)
            logger.info(`Objeto ${name} retornado com sucesso`)
            return res.status(200).json(personData)
        } catch (error) {
            logger.warn(`Erro ao buscar por ${req.body.nome}`)
            return res.status(400).json({erro: error.message})
        }
    }
    
    static async listAll(req,res){
        logger.debug(`Requisição GET listando todos os objetos`)
        try {
            const peaple = await personService.getAll()
            logger.info(`Lista de objetos retornada com sucesso`)
            return res.status(200).json(peaple)
        } catch (error) {
            logger.warn(`Erro ao listar todos os objetos`)
            return res.status(400).json({erro: error.message})
        }
    }

    static async _findAPersonDataByName(name){
        logger.debug(`Buscando por ${name} no banco de dados`)
        let personData = await personService.findByName(name)
        if (!personData) {
            logger.debug(`Nome não encontrado no banco, buscando no RequestService`)
            personData = await new RequestService(name).getAll()
        }
        return personData
    }

    static async _wantToSave(req, personData) {
        if (req.params.save == "save" && !await personService.findByName(personData.nome)) {
            logger.debug(`Salvando ${personData.nome} no banco de dados`)
            await personService.save(personData)
        }
    }
    
}

module.exports = PersonController