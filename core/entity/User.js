const BaseEntity = require('./BaseEntity');

const collection = 'user';

class User extends BaseEntity {
    constructor() {
        super();
        this.username = '';
        this.password = '';
    }

    static create({ _id, username, password, deleted = false }) {
        return (new User())
            .setId(_id)
            .setUsername(username)
            .setPassword(password)
            .setDeleted(deleted);
    }

    static getCollectionName() {
        return collection;
    }

    getCollectionName() {
        return collection;
    }

    getUsername() {
        return this.username;
    }

    setUsername(username) {
        this.username = username;

        return this;
    }

    getPassword() {
        return this.password;
    }

    setPassword(password) {
        this.password = password;

        return this;
    }
}

module.exports = User;