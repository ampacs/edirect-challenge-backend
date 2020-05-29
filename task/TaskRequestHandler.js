const ProjectProvider = require('../core/provider/ProjectProvider');
const TaskProvider = require('../core/provider/TaskProvider');
const Task = require('../core/entity/Task');

class TaskRequestHandler {
    /**
     * @param {Request} req 
     */
    static async handleTaskRequest(req) {
        let tasks = [];
        ProjectProvider.findByUserId
        await TaskProvider.findByProjectId(req.body.projectId)
            .then(items => tasks = items)
            .catch(err => { throw err })
        return tasks
    }

    /**
     * @param {Request} req 
     */
    static async handleTaskCreationRequest(req) {
        Task.create({
            projectId: req.body.projectId,
            name: req.body.name,
            description: req.body.description,
            createdAt: new Date(),
            dueBy: req.body.dueBy,
        }).save()
    }

    /**
     * @param {Request} req 
     */
    static async handleTaskUpdateRequest(req) {
        const task = await TaskProvider.findById(req.body.id);
        Task.create({
            _id: req.body.id,
            name: req.body.name,
            description: req.body.description,
            createdAt: task.getCreatedAt(),
            dueBy: req.body.dueBy,
            completed: req.body.completed || false,
            deleted: req.body.deleted || false
        }).save()
    }
}

module.exports = TaskRequestHandler