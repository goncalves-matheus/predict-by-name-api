const { RegisterService }  = require('../services')
const RegisterSecurity = require('../security/RegisterSecurity')

const registerSecurity = new RegisterSecurity()

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
        try {
            const token = registerSecurity.createJWT(req.user)
            res.set('Authorization', token)
            return res.status(204).send()
        } catch (error) {
            return res.status(400).json({erro: error.message})
        }
    }

}

module.exports = RegisterController