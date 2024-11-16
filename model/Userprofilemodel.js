const db = require('../config/db');
const UserProfile = {
    addOrUpdateProfile: (profile, callback) => {
        // Prepare the base insert SQL with placeholders for all profile fields
        const insertSql = `
            INSERT INTO user_profile 
            (user_id, fullname, mobileno, companyname, emailaddress, creditlimit, address, pincode, city, landmark, state)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        // Extract fields to update dynamically
        const fieldsToUpdate = { ...profile };
        delete fieldsToUpdate.userId; // Remove userId since it's used for the ON DUPLICATE check

        // Check if there are fields to update
        if (Object.keys(fieldsToUpdate).length > 0) {
            // Build SQL for updating only specified fields
            const updateFields = Object.keys(fieldsToUpdate).map(field => `${field} = ?`).join(', ');
            const updateValues = Object.values(fieldsToUpdate);

            // Combine insert and update query
            const profileSql = `${insertSql} ON DUPLICATE KEY UPDATE ${updateFields}`;

            // Prepare values for insert (all fields, including userId) followed by update values
            const profileValues = [
                profile.userId, profile.fullname || null, profile.mobileno || null, profile.companyname || null,
                profile.emailaddress || null, profile.creditlimit || null, profile.address || null,
                profile.pincode || null, profile.city || null, profile.landmark || null, profile.state || null,
                ...updateValues
            ];

            db.query(profileSql, profileValues, callback);
        } else {
            callback({ error: "No fields to update." });
        }
    },

    getProfileByUserId: (userId, callback) => {
        const sql = 'SELECT * FROM user_profile WHERE user_id = ?';
        db.query(sql, [userId], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0]);
        });
    },

    getAllUsersWithProfile: (callback) => {
        const sql = `
            SELECT 
                u.id AS user_id, u.username, u.email, u.isAdmin,
                up.fullname, up.mobileno, up.companyname, up.emailaddress,
                up.creditlimit, up.address, up.pincode, up.city, up.landmark, up.state
            FROM 
                user u
            LEFT JOIN 
                user_profile up ON u.id = up.user_id
        `;

        db.query(sql, (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    }
};

module.exports = UserProfile;
