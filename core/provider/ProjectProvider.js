const dbClient = require("../db/DbClient");
const Project = require("../entity/Project");
const User = require("../entity/User");

class ProjectProvider
{
    /**
     * @param {*} id
     * @returns {Project}
     */
    static async findById(id)
    {
        let project = null;
        await dbClient.getCollection(Project.getCollectionName()).
            then(
                async (collection) => await collection.findOne({ _id: id })
                    .then(item => project = Project.create(item))
                    .catch(err => { throw err })
            )
            .catch(err => { throw err });
        return project;
    }

    /**
     * @param {*} userId
     * @param {boolean} deleted
     * @returns {Array<Project>}
     */
    static async findByUserId(userId, deleted = false)
    {
        let projects = [];
        await dbClient.getCollection(Project.getCollectionName()).
            then(
                async (collection) => await collection.find({ userId, deleted }).toArray()
                    .then(items => items.forEach(
                        item => projects.push(Project.create(item))
                    ))
                    .catch(err => { throw err })
            )
            .catch(err => { throw err });
        return projects;
    }


    /**
     * @param {User} user
     * @param {boolean} deleted
     * @returns {Array<Project>}
     */
    static async findByUser(user, deleted = false)
    {
        return this.findByUserId(user.getId(), deleted);
    }
}

module.exports = ProjectProvider