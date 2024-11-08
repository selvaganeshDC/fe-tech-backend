const db = require('../config/db');

const User = {
    // Add new user
    registerUser: (user, callback) => {
        const userSql = `
            INSERT INTO user (username, email, password)
            VALUES (?, ?, ?)
        `;
        const userValues = [user.username, user.email, user.password];

        // Insert user details
        db.query(userSql, userValues, callback);
    },
    findByEmail: (email, callback) => {
        const sql = 'SELECT * FROM user WHERE email = ?';
        db.query(sql, [email], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0]); // Return the first result, if found
        });
    }
};

module.exports = User;
