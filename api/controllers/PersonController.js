const PersonService = require('../services/PersonService')
const RequestService = require('../services/RequestService')

class PersonController {

    static async searchByName(req,res){
        const save = req.params.save
        console.log(save);
        try {
            const name = req.body.nome
            if (!name) {
                throw new Error("O nome não pode estar vazio")
            }
            const personData = await new RequestService(name).getAll()
            if(save=="save"){
                const newPerson = await new PersonService().save(personData)
                return res.status(200).json(newPerson)
            }
            return res.status(200).json(personData)
        } catch (error) {
            return res.status(400).json({erro: error.message})
        }
    }

    static async listAll(req,res){
        try {
            const peaple = await new PersonService().getAll()
            return res.status(200).json(peaple)
        } catch (error) {
            return res.status(400).json({erro: error.message})
        }
    }

}
module.exports = PersonController