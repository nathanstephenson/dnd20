const {RESTDataSource} = require('apollo-datasource-rest');

class characterAPI extends RESTDataSource {
    constructor(){
        super();
        this.expandAPIRef = this.expandAPIRef.bind(this)
        this.baseURL = 'https://www.dnd5eapi.co/'
    }
    async expandAPIRef(array){
        let newarray = []
        for await(let element of array) {
            let expanded = await this.get(element.url)
            newarray.push(expanded)
        }
        console.log(newarray)
        return newarray
    }


    async getClasses(){//should just deliver all populated classes
        let {results} = await this.get(`api/classes`)
        return await this.expandAPIRef(results)
    }

    async getRaces(){
        let {results} = await this.get(`api/races`)
        return await this.expandAPIRef(results)
    }

    async getAny(url){
        let {results} = await this.get(url)
        return await this.expandAPIRef(results)
    }
}


module.exports = characterAPI;
