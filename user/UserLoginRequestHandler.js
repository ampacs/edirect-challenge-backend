const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserProvider = require("../core/provider/UserProvider");

class UserLoginRequestHandler {
    /**
     * @param {Request} req 
     */
    static async handleUserLoginRequest(req) {
        const user = await UserProvider.findByUsername(req.body.username);
        if (user === null || typeof user === 'undefined') {
            throw {
                code: 404,
                message: "username not found"
            };
        }

        let success = false;
        await bcrypt.compare(req.body.password, user.getPassword());
        try {
            success = await bcrypt.compare(req.body.password, user.getPassword());
        } catch (e) {
            throw {
                code: 500,
                message: e
            };
        }

        if (!success) {
            throw {
                code: 400,
                message: "incorrect password"
            };
        }

        return jwt.sign(user.objectify(), process.env.SECRET_ACCESS_TOKEN);
    }
}

module.exports = UserLoginRequestHandler