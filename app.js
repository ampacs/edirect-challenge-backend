require('dotenv').config();

const express = require('express');

const { port } = require('./config/config.json');
const mongoDbClient = require('./core/db/DbClient');
const ProjectRequestHandler = require('./project/ProjectRequestHandler');
const UserLoginRequestHandler = require('./user/UserLoginRequestHandler');
const UserRegistryRequestHandler = require('./user/UserRegistryRequestHandler');
const AccessTokenValidator = require('./auth/AccessTokenValidator');
const TaskRequestHandler = require('./task/TaskRequestHandler');

const app = express();

mongoDbClient.connect();

process.on('exit', mongoDbClient.close);
process.on('SIGINT', mongoDbClient.close);
process.on('SIGTERM', mongoDbClient.close);
process.on('SIGKILL', mongoDbClient.close);
process.on('uncaughtException', mongoDbClient.close);

app.use(express.json());

app.get('/', (_, res) => {
    res.status(404).send()
});

app.get('/api/projects', AccessTokenValidator.validateToken, async (req, res) => {
    try {
        const projects = await ProjectRequestHandler.handleProjectRequest(req);
        res.status(200).json(projects);
    } catch (e) {
        res.status(500).send(`failed to fetch projects - ${e}`);
    }
});

app.post('/api/project/create', AccessTokenValidator.validateToken, async (req, res) => {
    ProjectRequestHandler.handleProjectCreationRequest(req)
        .then(res.status(201).json('project created successfully'))
        .catch(err => res.status(500).send(`failed to create project - ${err}`));
});

app.post('/api/project/update', AccessTokenValidator.validateToken, async (req, res) => {
    ProjectRequestHandler.handleProjectUpdateRequest(req)
        .then(res.status(200).json('project updated successfully'))
        .catch(err => res.status(500).send(`failed to update project - ${err}`));
});

app.get('/api/tasks', AccessTokenValidator.validateToken, async (req, res) => {
    try {
        const projects = await ProjectRequestHandler.handleProjectRequest(req);
        res.status(200).json(projects);
    } catch (e) {
        res.status(500).send(`failed to fetch projects - ${e}`);
    }
});

app.post('/api/task/create', AccessTokenValidator.validateToken, async (req, res) => {
    TaskRequestHandler.handleTaskCreationRequest(req)
        .then(res.status(201).json('task created successfully'))
        .catch(err => res.status(500).send(`failed to create task - ${err}`));
});

app.post('/api/task/update', AccessTokenValidator.validateToken, async (req, res) => {
    TaskRequestHandler.handleTaskUpdateRequest(req)
        .then(res.status(200).json('task updated successfully'))
        .catch(err => res.status(500).send(`failed to update task - ${err}`));
});

app.post('/api/user/register', async (req, res) => {
    try {
        await UserRegistryRequestHandler.handleUserRegistryRequest(req);
        res.status(201).send("user registered successfully");
    } catch (e) {
        res.status(500).send(`failed to register user - ${e}`);
    }
});

app.post('/api/user/login', async (req, res) => {
    try {
        const accessToken = await UserLoginRequestHandler.handleUserLoginRequest(req);
        res.status(200).json({ access_token: accessToken });
    } catch (e) {
        res.status(e.code || 500).send(e.message || e);
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})