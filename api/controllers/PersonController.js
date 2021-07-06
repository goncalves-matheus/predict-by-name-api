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
            
            const personData = await PersonController.findAPersonDataByName(name)
            
            PersonController.wantToSave(req, personData)
            
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

    static async findAPersonDataByName(name){
        console.log(name);
        let personData = await personService.findByName(name)
        if (!personData) {
            personData = await new RequestService(name).getAll()
        }
        return personData
    }

    static async wantToSave(req, personData) {
        if (req.params.save == "save") {
            await personService.save(personData)
        }
    }


}

module.exports = PersonController