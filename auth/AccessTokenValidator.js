const jwt = require('jsonwebtoken');

class AccessTokenValidator {
    static validateToken(req, res, next) {
        /** @type {string} */
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).send('Unauthorized access - missing access token');
        }

        jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (err, user) => {
            if (err) {
                return res.status(403).send('Unauthorized access - invalid access token');
            }

            req.user = user;
            next();
        })
    }
}

module.exports = AccessTokenValidator