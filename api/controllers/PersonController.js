const database = require('../models')

class PersonController {
    static async test(req, res){
        try {
            return res.status(200).json({message: 'Sucesso!'});
        } catch (error) {
            return res.status(500).json(error.message);
        } 
    }
}
module.exports = PersonController