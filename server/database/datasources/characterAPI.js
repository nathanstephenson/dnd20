const {RESTDataSource} = require('apollo-datasource-rest');

class characterAPI extends RESTDataSource {
    constructor(){
        super();
        this.baseURL = 'https://www.dnd5eapi.co/'
    }

    async expandAPIRef(array){
        let newarray = []
        for await(let element of array) {
            let expanded = await this.get(element.url)
            newarray.push(expanded)
        }
        return newarray
    }


    async getClasses(){//should just deliver all populated classes
        const {results} = await this.get(`api/classes`)
        return await this.expandAPIRef(results)
    }
    async getClass(index){
        const result = await this.get(`api/classes/${index}`)
        return result
    }
    async getRaces(){
        const {results} = await this.get(`api/races`)
        return await this.expandAPIRef(results)
    }
    async getRace(index){
        const result = await this.get(`api/races/${index}`)
        return result
    }
    async getAbilityScores(){
        const {results} = await this.get(`api/ability-scores`)
        return await this.expandAPIRef(results)
    }
    async getSkills(){
        const {results} = await this.get(`api/skills`)
        return await this.expandAPIRef(results)
    }
}


module.exports = characterAPI;
