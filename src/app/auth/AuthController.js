const jwt = require("jsonwebtoken")

const AuthController = {

    //generate Access token
    generateAccessToken(user) {
        return jwt.sign(
            {
                _id: user.id,
                admin: user.role 
            },
            process.env.Access,
            { expiresIn: "90d" }
        );
    },

    //generate refreshToken token
    generateRefreshToken(user) {
        return jwt.sign(
            {
                _id: user.id,
                admin: user.role 
            },
            process.env.Refresh,
            { expiresIn: "365d" }
        );
    },
};

module.exports = AuthController;