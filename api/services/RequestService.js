const axios = require('axios')
const logger = require('../../logger')

const GENDER = 'https://api.genderize.io?name='
const COUNTRY = 'https://api.nationalize.io?name='
const AGE = 'https://api.agify.io?name='
const PHRASE = 'https://www.affirmations.dev'

class RequestService {
    constructor(name) {
        this.name = name
        logger.debug("Iniciando serviço de requisições")
    }

    async getAll(){
        const age = await this.getAge()
        const gender = await this.getGender() 
        const nationalite = await this.getNationalite()
        const phrase = await this.getPhrase()
        const formattedName = this._firstLetterToUppercase(this.name)
        
        logger.debug("Retornando todos os dados do usuário")
        return {
            "nome": formattedName,
            "genero": gender,
            "idade": age,
            "pais": nationalite,
            "frase": phrase
        }
    }
    
    async getGender() {
        logger.debug("Carregando genero")
        try {
            const data = await this._sendRequest(GENDER + this.name)
            const gender = JSON.stringify(data.gender)
            return gender == '"male"' ? "masculino" : "feminino"
        } catch (error) {
            logger.error(error.message)
            throw new Error(error.message)
        }
    }
    
    async getNationalite() {
        logger.debug("Carregando país")
        try {
            const data = await this._sendRequest(COUNTRY + this.name)
            const country = data['country'][0]['country_id']
            return country
        } catch (error) {
            logger.error(error.message)
            throw new Error(error.message)
        }
    }
    
    async getAge() {
        logger.debug("Carregando idade")
        try {
            const data = await this._sendRequest(AGE + this.name)
            const age = data.age
            return this._checkPlural(age)
        } catch (error) {
            logger.error(error.message)
            throw new Error(error.message)
        }
    }
    
    async getPhrase() {
        logger.debug("Carregando frase")
        try {
            const data = await this._sendRequest(PHRASE)
            const phrase = data.affirmation
            return phrase
        } catch (error) {
            logger.error(error.message)
            throw new Error(error.message)
        }
    }
    
    async _sendRequest(url) {
        logger.debug("Enviando nova requisição")
        try {
            const { data } = await axios(url)
            return data
        } catch (error) {
            logger.error(error.message)
            throw new Error(error.message)
        }
    }

    _checkPlural(age){
        if(parseInt(age) > 1){
            return age + " anos"
        }
        return age + " ano"
    }

    _firstLetterToUppercase(name) {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }
}

module.exports = RequestService