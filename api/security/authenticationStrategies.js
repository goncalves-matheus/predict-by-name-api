const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const BearerStrategy = require('passport-http-bearer').Strategy
const jwt = require('JsonWebToken')

const bcrypt = require('bcrypt')

const { RegisterService }  = require('../services')
const registerService = new RegisterService()

function verifyUser(user) {
    if(!user){
        throw new Error('O usuário não é válido')
    }
}

async function verifyPassword(password, hashPassword) {
    const isValid = await bcrypt.compare(password, hashPassword)
    if(!isValid){
        throw new Error('A senha não é válida')
    }
}

passport.use(
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'senha',
        session: false
    }, async (email,senha,done) => {
        try {
            const user = await registerService.findByEmail(email)
            verifyUser(user)
            await verifyPassword(senha, user.senha)
            done(null, user);
        } catch (error) {
            done(error);
        }

    })
)

passport.use(
    new BearerStrategy(
        async (token, done) => {
            try {
                const payload = jwt.verify(token, process.env.CHAVE_JWT)
                const user = await registerService.findById(payload.id)
                done(null, user)
            } catch (error) {
                done(error)
            }
    })
)