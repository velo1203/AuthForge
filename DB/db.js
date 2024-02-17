const sqlite3 = require("sqlite3").verbose();

class Database {
    constructor(dbPath) {
        // 데이터베이스 연결
        this.db = new sqlite3.Database(
            dbPath,
            sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
            (err) => {
                if (err) {
                    console.error("Database connection error:", err.message);
                } else {
                    console.log("Database connection successful");
                }
            }
        );

        // 사용자 테이블 초기화
        this.initialize();
    }

    initialize() {
        const sql = `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        name TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `;

        return new Promise((resolve, reject) => {
            this.db.run(sql, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    addUser(email, password, name) {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO users (email, password, name) VALUES (?, ?, ?)`;
            this.db.run(sql, [email, password, name], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this);
                }
            });
        });
    }

    getUser(email) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM users WHERE email = ?`;
            this.db.get(sql, [email], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }
}

module.exports = Database;
