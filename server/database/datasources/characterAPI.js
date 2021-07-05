const {RESTDataSource} = require('apollo-datasource-rest');
const {expandAPIRef} = require('../functions')

class characterAPI extends RESTDataSource {
    constructor(){
        super();
        this.baseURL = 'https://www.dnd5eapi.co/'
    }

    async getClasses(){//should just deliver all populated classes
        let {results} = await this.get(`api/classes`)
        return await expandAPIRef(results, this)
    }
    async getClass(index){//WIP
        let result = await this.get(`api/classes/${index}`)
        result.proficiencies = await expandAPIRef(result.proficiencies, this)
        result.proficiency_choices = await expandAPIRef(result.proficiency_choices, this)
        result.starting_equipment = await expandAPIRef(result.starting_equipment, this)
        result.starting_equipment_options = await expandAPIRef(result.starting_equipment_options, this)
        result.subclasses = await expandAPIRef(result.subclasses, this)
        console.log(result)
        return result
    }
    async getRaces(){
        const {results} = await this.get(`api/races`)
        return await expandAPIRef(results, this)
    }
    async getRace(index){
        const result = await this.get(`api/races/${index}`)
        return result
    }
    async getAbilityScores(){
        const {results} = await this.get(`api/ability-scores`)
        return await expandAPIRef(results, this)
    }
    async getSkills(){
        const {results} = await this.get(`api/skills`)
        return await expandAPIRef(results, this)
    }
}


module.exports = characterAPI;
