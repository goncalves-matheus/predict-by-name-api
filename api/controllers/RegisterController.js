const { RegisterService }  = require('../services')
const RegisterSecurity = require('../security/RegisterSecurity')

const logger = require('../logger')

const registerSecurity = new RegisterSecurity()
const registerService = new RegisterService()

class RegisterController {
    static async register(req,res){
        logger.debug('Requisição POST recebida para RegisterController.register')
        try {
            const data = req.body
            if (await registerService.findByEmail(data.email)) {
                throw new Error("Email já cadastrado")
            }
            await registerService.save(data)
            logger.info('Cadastro salvo com sucesso')
            return res.status(204).send()
        } catch (error) {
            logger.warn(error.message)
            return res.status(400).json({erro: error.message})
        }
    }

    static async login(req,res){
        logger.debug('Requisição POST recebida para RegisterController.login')
        try {
            const token = registerSecurity.createJWT(req.user)
            res.set('Authorization', token)
            logger.info('Token de autenticação gerado com sucesso')
            return res.status(204).send()
        } catch (error) {
            logger.warn(error.message)
            return res.status(400).json({erro: error.message})
        }
    }

}

module.exports = RegisterController