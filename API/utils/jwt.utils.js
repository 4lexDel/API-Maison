// Imports
var jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = 'azfc450zezyjk4504dsdfjvlz54sernbtlvb245zezcfzad';

// Exported functions
module.exports = {
    generateTokenForUser: function(userData) {
        return jwt.sign({
                idUser: userData.idUser,
                admin: userData.admin
            },
            JWT_SIGN_SECRET, {
                expiresIn: '1h'
            })
    },
    parseAuthorization: function(authorization) {
        return (authorization != null) ? authorization.replace('Bearer ', '') : null;
    },
    getUserId: function(authorization) {
        var userId = -1;
        var token = module.exports.parseAuthorization(authorization);
        if (token != null) {
            try {
                var jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
                if (jwtToken != null)
                    userId = jwtToken.idUser;
            } catch (err) {}
        }
        return userId;
    }
}