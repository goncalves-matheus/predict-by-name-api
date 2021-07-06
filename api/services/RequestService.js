const axios = require('axios')

const GENDER = 'https://api.genderize.io?name='
const COUNTRY = 'https://api.nationalize.io?name='
const AGE = 'https://api.agify.io?name='
const PHRASE = 'https://www.affirmations.dev'

class RequestService {

    constructor(name) {
        this.name = name
    }

    async getAll(){
        const age = await this.getAge()
        const gender = await this.getGender() 
        const nationalite = await this.getNationalite()
        const phrase = await this.getPhrase()
        const formattedName = this._firstLetterToUppercase(this.name)
        
        return {
            "nome": formattedName,
            "genero": gender,
            "idade": age,
            "pais": nationalite,
            "frase": phrase
        }
    }
    
    async getGender() {
        try {
            const data = await this._sendRequest(GENDER + this.name)
            const gender = JSON.stringify(data.gender)
            return gender == '"male"' ? "masculino" : "feminino"
        } catch (error) {
            throw new Error(error.message)
        }
    }
    
    async getNationalite() {
        try {
            const data = await this._sendRequest(COUNTRY + this.name)
            const country = data['country'][0]['country_id']
            return country
        } catch (error) {
            throw new Error(error.message)
        }
    }
    
    async getAge() {
        try {
            const data = await this._sendRequest(AGE + this.name)
            const age = data.age
            return this._checkPlural(age)
        } catch (error) {
            throw new Error(error.message)
        }
    }
    
    async getPhrase() {
        try {
            const data = await this._sendRequest(PHRASE)
            const phrase = data.affirmation
            return phrase
        } catch (error) {
            throw new Error(error.message)
        }
    }
    
    async _sendRequest(url) {
        try {
            const { data } = await axios(url)
            return data
        } catch (error) {
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