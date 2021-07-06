const bcrypt = require('bcrypt') 
const jwt = require('jsonwebtoken')

class PersonSecurity {

    async addPassword(password){
        const weight = 12
        return bcrypt.hash(password, weight)
    }

    createJWT(user) {
        const payload = {
            id: user.id
        }
        const token = jwt.sign(payload, process.env.CHAVE_JWT, { expiresIn: '15m' })
        
        return token
    }
     
}


module.exports = PersonSecurity