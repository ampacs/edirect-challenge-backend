const BaseEntity = require("./BaseEntity");

const collection = 'project';

class Project extends BaseEntity {
    constructor() {
        super();
        this.userId;
        this.name = '';
    }

    static create({ _id, userId, name, deleted = false }) {
        return (new Project())
            .setId(_id)
            .setUserId(userId)
            .setName(name)
            .setDeleted(deleted);
    }

    static getCollectionName() {
        return collection;
    }

    getCollectionName() {
        return collection;
    }

    getUserId() {
        return this.userId;
    }

    setUserId(userId) {
        this.userId = userId;

        return this;
    }

    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;

        return this;
    }
}

module.exports = Project;