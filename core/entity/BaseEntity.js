const mongoDbClient = require('../db/DbClient');

class BaseEntity {
    constructor() {
        this._id;
        this.deleted = false;
    }

    /**
     * @param {object} obj 
     */
    static create(obj) {
        throw 'creation from object is not defined';
    }

    static getCollectionName() {
        throw 'collection is not defined';
    }

    getCollectionName() {
        throw 'collection is not defined';
    }

    getId() {
        return this._id;
    }

    setId(id) {
        this._id = id;

        return this;
    }

    isDeleted() {
        return this.deleted;
    }

    setDeleted(deleted) {
        this.deleted = deleted;

        return this;
    }

    objectify() {
        const instance = this;
        let obj = {};
        Object.keys(this).forEach(key => obj[key] = instance[key]);
        return obj
    }

    async save() {
        if (!this._id) {
            mongoDbClient.insert(this).catch(err => { throw err });
        } else {
            mongoDbClient.update(this).catch(err => { throw err });
        }
    }
}

module.exports = BaseEntity