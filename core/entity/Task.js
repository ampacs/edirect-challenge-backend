const BaseEntity = require("./BaseEntity");

const collection = 'task';

class Task extends BaseEntity {
    constructor() {
        super();
        this.projectId;
        this.name = '';
        this.description = '';
        this.createdAt = '';
        this.dueBy = '';
        this.completed = false;
    }

    /**
     * @param {object} obj 
     */
    static create({ _id, projectId, name, description, createdAt, dueBy, completed = false, deleted = false }) {
        return (new Task())
            .setId(_id)
            .setProjectId(projectId)
            .setName(name)
            .setDescription(description)
            .setCreatedAt(createdAt)
            .setDueBy(dueBy)
            .setCompleted(completed)
            .setDeleted(deleted);
    }

    static getCollectionName() {
        return collection;
    }

    getCollectionName() {
        return collection;
    }

    getProjectId() {
        return this.projectId;
    }

    setProjectId(projectId) {
        this.projectId = projectId;

        return this;
    }

    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;

        return this;
    }

    getDescription() {
        return this.description;
    }

    setDescription(description) {
        this.description = description;

        return this;
    }

    getCreatedAt() {
        return this.description;
    }

    setCreatedAt(createdAt) {
        this.createdAt = createdAt;

        return this;
    }

    getDueBy() {
        return this.dueBy;
    }

    setDueBy(dueBy) {
        this.dueBy = dueBy;

        return this;
    }

    isCompleted() {
        return this.completed;
    }

    setCompleted(completed) {
        this.completed = completed;

        return this;
    }
}

module.exports = Task;