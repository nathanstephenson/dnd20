const {RESTDataSource} = require('apollo-datasource-rest');

class itemsAPI extends RESTDataSource {
    constructor(){
        super();
        this.baseURL = 'https://www.dnd5eapi.co/api/'
    }

    async getCategories(){
        const {results} = await this.get(`equipment-categories`)
        return results
    }
    async getEquipment(index){
        const results = await this.get(`equipment/${index}`)
        return results
    }
    async getMagicItem(index){
        const results = await this.get(`magic-items/${index}`)
        return results
    }
    async getAny(any){//meant for submitting longer strings
        const results = await this.get(`${any}`)
        return results
    }
}
module.exports = itemsAPI;