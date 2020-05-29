const bcrypt = require('bcrypt');

const User = require("../core/entity/User");

class UserRegistryRequestHandler {
    static async handleUserRegistryRequest(req) {
        const user = new User();
        const password = await bcrypt.hash(req.body.password, 10)
        user
            .setUsername(req.body.username)
            .setPassword(password)
            .save();
    }
}

module.exports = UserRegistryRequestHandler