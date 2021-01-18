import { DataSource } from 'apollo-datasource'
import { InMemoryLRUCache } from 'apollo-server-caching'
import DataLoader from 'dataloader'

class dndDataSource extends DataSource {
  constructor(dbClient) { 
    super()
    this.db = dbClient;
    this.loader = new DataLoader(ids => dbClient.getByIds(ids));
  }

  initialize({ context, cache } = {}) {  }

  didEncounterError(error) {  }

  cacheKey(id) {  } 

  async get(id, { ttlInSeconds } = {}) {  }

  async update(id, newDoc) {  }
};