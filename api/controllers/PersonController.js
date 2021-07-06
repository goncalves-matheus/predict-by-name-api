const { PersonService }  = require('../services')
const { RequestService } = require('../services')

const personService = new PersonService()

class PersonController {

    static async searchByName(req,res){
        try {
            const name = req.body.nome
            if (!name) {
                throw new Error("O nome não pode estar vazio")
            }
            const personData = await new RequestService(name).getAll()
            if(req.params.save=="save"){
                const newPerson = await personService.save(personData)
                return res.status(200).json(newPerson)
            }
            return res.status(200).json(personData)
        } catch (error) {
            return res.status(400).json({erro: error.message})
        }
    }

    static async listAll(req,res){
        try {
            const peaple = await personService.getAll()
            return res.status(200).json(peaple)
        } catch (error) {
            return res.status(400).json({erro: error.message})
        }
    }
}
module.exports = PersonController