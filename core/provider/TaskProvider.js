const dbClient = require("../db/DbClient");
const Project = require("../entity/Project");
const Task = require("../entity/Task");

class TaskProvider
{
    /**
     * @param {*} id
     * @returns {Task}
     */
    static async findById(id)
    {
        let project = null;
        await dbClient.getCollection(Task.getCollectionName()).
            then(
                async (collection) => await collection.findOne({ _id: id })
                    .then(item => project = Task.create(item))
                    .catch(err => { throw err })
            )
            .catch(err => { throw err });
        return project;
    }

    /**
     * @param {*} projectId
     * @param {boolean} deleted
     * @returns {Array<Task>}
     */
    static async findByProjectId(projectId, deleted = false)
    {
        let projects = [];
        await dbClient.getCollection(Task.getCollectionName()).
            then(
                async (collection) => await collection.find({ projectId, deleted }).toArray()
                    .then(items => items.forEach(
                        item => projects.push(Task.create(item))
                    ))
                    .catch(err => { throw err })
            )
            .catch(err => { throw err });
        return projects;
    }

    /**
     * @param {Project} project
     * @param {boolean} deleted
     * @returns {Array<Task>}
     */
    static async findByProject(project, deleted = false)
    {
        return this.findByProjectId(project.getId(), deleted);
    }
}

module.exports = TaskProvider