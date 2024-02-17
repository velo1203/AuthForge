const jwt = require("jsonwebtoken");

class AuthModule {
    constructor(db) {
        this.db = db;
        this.secret = "";
    }

    async authenticate(token) {
        try {
            jwt.verify(token, this.secret, async (err, decoded) => {
                if (err) {
                    throw new Error("invalid token");
                }
                const user = await this.db.getUser(decoded.email);
                return user;
            });
        } catch (error) {
            throw error;
        }
    }
}
module.exports = AuthModule;
