const Project = require('../core/entity/Project');
const User = require('../core/entity/User');
const ProjectProvider = require('../core/provider/ProjectProvider');
const UserProvider = require('../core/provider/UserProvider');

class ProjectRequestHandler {
    /**
     * @param {Request} req 
     */
    static async handleProjectRequest(req) {
        let projects = [];
        await UserProvider.findByUsername(req.user.username)
            .then(user => ProjectProvider.findByUser(user)
                .then(items => projects = items)
                .catch(err => { throw err })
            )
            .catch(err => { throw err })
        return projects
    }

    /**
     * @param {Request} req 
     */
    static async handleProjectCreationRequest(req) {
        const user = await UserProvider.findByUsername(req.user.username);

        if (!req.body.name) {
            throw {
                code: 403,
                message: "project name is not defined"
            }
        }
        if (!user.getId()) {
            throw {
                code: 500,
                message: "failed to fetch user"
            }
        }

        Project.create({
            userId: user.getId(),
            name: req.body.name
        }).save()
    }

    /**
     * @param {Request} req 
     */
    static async handleProjectUpdateRequest(req) {
        if (!req.body.id) {
            throw {
                code: 403,
                message: "project id is not defined"
            }
        }
        if (!req.body.name) {
            throw {
                code: 403,
                message: "project name is not defined"
            }
        }

        Project.create({
            _id: req.body.id,
            name: req.body.name,
            deleted: req.body.deleted || false
        }).save()
    }
}

module.exports = ProjectRequestHandler