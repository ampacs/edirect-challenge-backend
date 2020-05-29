const client = require("../core/db/DbClient");
const { Db } = require("mongodb");

process.on('exit', client.close);
process.on('SIGINT', client.close);
process.on('SIGTERM', client.close);
process.on('SIGKILL', client.close);
process.on('uncaughtException', client.close);


let pending = 3;

const close = () => {
    if (--pending === 0) {
        process.exit(0);
    }
}

/**
 * @param {Db} db 
 */
const setup = async (db) => {
    db.createCollection('user', {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: [ "username", "password", "deleted" ],
                properties: {
                    _id: {},
                    username: {
                        bsonType: "string",
                        description: "must be a unique string, and is required"
                    },
                    password: {
                        bsonType: "string",
                        description: "must be a string and is required"
                    },
                    deleted: {
                        bsonType: "bool",
                        description: "must be a boolean and is required"
                    }
                }
            }
        }
    }, close);
    db.createCollection('project', {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: [ "userId", "name", "deleted" ],
                properties: {
                    _id: {},
                    userId: {},
                    name: {
                        bsonType: "string",
                        description: "must be a string and is required"
                    },
                    deleted: {
                        bsonType: "bool",
                        description: "must be a boolean and is required"
                    }
                }
            }
        }
    }, close);
    db.createCollection('task', {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: [ "projectId", "name", "completed", "deleted" ],
                properties: {
                    _id: {},
                    projectId: {},
                    password: {
                        bsonType: "name",
                        description: "must be a string and is required"
                    },
                    completed: {
                        bsonType: "bool",
                        description: "must be a boolean and is required"
                    },
                    deleted: {
                        bsonType: "bool",
                        description: "must be a boolean and is required"
                    }
                }
            }
        }
    }, close);

    db.collection('user').createIndex( { username: 1 }, { unique: true } )
}

client.connect()
    .then(() => {
        let db = client.getDatabase();
        setup(db);
    })
    .catch(err => { throw err })
