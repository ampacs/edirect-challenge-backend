const config = require('../../config/config.json');
const { MongoClient } = require('mongodb');
//const BaseEntity = require('../entity/BaseEntity');

class MongoDbClient
{
    /**
     * @param {string} url
     * @param {string} db
     */
    constructor({ url, name })
    {
        this.url = url;
        this.db = name;
        this.client = null;
    }

    getDatabase() {
        if (!this.client) {
            throw 'client is undefined';
        }
        return this.client.db(this.db);
    }

    async connect()
    {
        if (this.client) {
            return;
        }
        await MongoClient
            .connect(this.url, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(result => this.client = result)
            .catch(err => { throw err })
        if (!this.client) {
            this.client = null;
            throw 'unable to fetch client';
        }
    }

    async close()
    {
        if (this.client) {
            this.client.close();
        }
        this.client = null;
    }

    /**
     * @param {string} collection
     */
    async getCollection(collection)
    {
        await this.connect();
        return this.getDatabase().collection(collection);
    }

    /**
     * @param {BaseEntity} entity
     */
    async insert(entity)
    {
        this.getCollection(entity.getCollectionName())
            .then(collection => collection.insertOne(entity).catch(err => { throw err }))
            .catch(err => { throw err });
    }

    /**
     * @param {BaseEntity} entity
     */
    async update(entity)
    {
        this.getCollection(entity.getCollectionName())
            .then(collection => collection.updateOne({ _id: entity.getId() }, { $set: entity }).catch(err => { throw err }))
            .catch(err => { throw err });
    }
}

module.exports = new MongoDbClient(config.db)