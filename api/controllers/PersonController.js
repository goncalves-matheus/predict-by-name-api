const database = require('../models')
const Request = require('../services/Request')

class PersonController {
    static async test(req, res){
        try {
            return res.status(200).json({message: 'Sucesso!'})
        } catch (error) {
            return res.status(500).json(error.message)
        } 
    }

    static async searchByName(req,res){
        try {
            const name = req.body.nome
            if (!name) {
                throw new Error("O nome não pode estar vazio")
            }
            const country = await new Request(name).getPhrase()
            return res.status(200).json({genero: country})
        } catch (error) {
            return res.status(400).json({erro: error.message})
        }
    }
}
module.exports = PersonController