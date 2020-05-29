const dbClient = require("../db/DbClient");
const User = require("../entity/User");

class UserProvider
{
    /**
     * @param {string} username
     * @param {boolean} deleted
     * @returns {User | null}
     */
    static async findByUsername(username, deleted = false)
    {
        let user = null;
        await dbClient.getCollection(User.getCollectionName()).
            then(
                async (collection) => await collection.findOne({ username, deleted })
                    .then(item => user = User.create(item))
                    .catch(err => { throw err })
            )
            .catch(err => { throw err });
        return user;
    }
}

module.exports = UserProvider