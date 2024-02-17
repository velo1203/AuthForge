const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
class UserModule {
    constructor(db) {
        this.db = db;
        this.secret = "YOUR_SECRET_KEY";
        this.expiresIn = "1h";
    }

    async register(email, password, name) {
        try {
            this.db.getUser(email);
            const hashedPassword = await bcrypt.hash(password, 10);
            await this.db.addUser(email, hashedPassword, name);
            const token = this.generateToken(email);
            const user = await this.db.getUser(email);
            const result = { user, token, expiresIn: this.expiresIn };
            return result;
        } catch (error) {
            if (error.code === "SQLITE_CONSTRAINT") {
                throw new Error("user already exists");
            }
            throw error; // 오류를 다시 throw하여 register를 호출하는 측에서 처리할 수 있도록 합니다.
        }
    }

    async login(email, password) {
        try {
            const user = await this.db.getUser(email);
            if (!bcrypt.compare(password, user.password)) {
                throw new Error("invalid password");
            }
            const token = this.generateToken(user.email);
            return { user, token, expiresIn: this.expiresIn };
        } catch (error) {
            throw error;
        }
    }

    generateToken(email) {
        return jwt.sign({ email }, this.secret, {
            expiresIn: this.expiresIn,
        });
    }
}

module.exports = UserModule;
