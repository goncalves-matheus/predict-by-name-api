const passport = require('passport')
module.exports = {
    local: (req, res, next) => {
        passport.authenticate(
            'local', 
            { session: false }, 
            (error, user, info) => {
                if(error && error.name === 'InvalidArgumentError'){ 
                    return res.status(401).json({ erro: error.message })
                }

                if(error){ 
                    return res.status(500).json({ erro: error.message })
                }

                if(!user){
                    return res.status(401).json()
                }
                req.user = user;
                return next()
            }
        )(req, res, next)
    },

    bearer:(req, res, next) => {
        passport.authenticate(
            'bearer',
            { session: false },
            (error, user, info) => {

                if (error && error.name === 'JsonWebTokenError') {
                    return res.status(401).json({ erro: error.message });
                }

                if(error && error.name === 'TokenExpiredError'){
                    return res.status(401).json({ erro: error.message, expiradoEm: error.expiredAt } )
                }

                if (error){
                    return res.status(500).json({ erro: error.message })
                }

                if(!user){
                    return res.status(500).json()
                }

                req.user = user;
                return next();
            }
        )(req, res, next);
    }

}