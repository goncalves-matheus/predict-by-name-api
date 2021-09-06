const pino = require('pino')({
    level: 'debug',
    prettyPrint: {
        colorize: true,
        levelFirst: true,
        translateTime: 'SYS:standard'
    }
});

module.exports = pino;