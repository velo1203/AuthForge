const Database = require("../DB/db.js");
const AuthModule = require("../AuthModule/AuthModule.js");
const UserModule = require("../UserModule/UserModule.js");

class AuthForge {
    constructor(dbPath) {
        const db = new Database(dbPath);
        this.user = new UserModule(db);
        this.auth = new AuthModule(db);
        this.secret = "";
    }

    setSecret(secret) {
        this.user.secret = secret;
        this.auth.secret = secret;
    }
}
module.exports = AuthForge;
