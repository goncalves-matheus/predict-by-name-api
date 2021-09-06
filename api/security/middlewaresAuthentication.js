const passport = require('passport')
const logger = require('../../logger')
module.exports = {
    local: (req, res, next) => {
        passport.authenticate(
            // logger.info('Local authentication'),
            'local', 
            { session: false }, 
            (error, user, info) => {
                if(error && error.name === 'InvalidArgumentError'){ 
                    logger.warn(error.message)
                    return res.status(401).json({ erro: error.message })
                }

                if(error){ 
                    logger.error(error)
                    return res.status(500).json({ erro: error.message })
                }

                if(!user){
                    logger.warn("Usuário não encontrado")
                    return res.status(401).json()
                }
                req.user = user;
                return next()
            }
        )(req, res, next)
    },

    bearer:(req, res, next) => {
        passport.authenticate(
            // logger.info('Bearer authentication'),
            'bearer',
            { session: false },
            (error, user, info) => {

                if (error && error.name === 'JsonWebTokenError') {
                    logger.warn(error.message)
                    return res.status(401).json({ erro: error.message });
                }

                if(error && error.name === 'TokenExpiredError'){
                    logger.warn(error.message)
                    return res.status(401).json({ erro: error.message, expiradoEm: error.expiredAt } )
                }

                if (error){
                    logger.error(error)
                    return res.status(500).json({ erro: error.message })
                }

                if(!user){
                    logger.error("Usuário não encontrado")
                    return res.status(500).json()
                }

                req.user = user;
                return next();
            }
        )(req, res, next);
    }

}