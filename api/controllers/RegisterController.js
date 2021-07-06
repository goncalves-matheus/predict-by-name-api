const { RegisterService }  = require('../services')
const PersonSecurity = require('../security/PersonSecurity')

const personSecurity = new PersonSecurity()

const registerService = new RegisterService()

class RegisterController {

    static async register(req,res){
        try {
            const data = req.body
            if (await registerService.findByEmail(data.email)) {
                throw new Error("Email já cadastrado")
            }
            await registerService.save(data)
            return res.status(204).send()
        } catch (error) {
            return res.status(400).json({erro: error.message})
        }
    }

    static async login(req,res){
        const token = personSecurity.createJWT(req.user)
        res.set('Authorization', token)
        return res.status(204).send()
    }

}
module.exports = RegisterController