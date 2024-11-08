// addToCartModel.js

const db = require('../config/db'); // Assumes you have a db.js file that sets up MySQL connection

const AddToCart = {
    addProductToCart: (productId, userId, quantity, callback) => {
        const sql = `
            INSERT INTO AddToCart (product_id, user_id, quantity)
            VALUES (?, ?, ?)
            ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)
        `;
        db.query(sql, [productId, userId, quantity], (err, result) => {
            if (err) {
                console.error("Error adding product to cart:", err);
                return callback(err);
            }
            callback(null, result);
        });
    },

    getUserCart: (userId, callback) => {
        const sql = `
            SELECT ac.cart_item_id, p.product_id, p.name, ac.quantity, p.mrp_rate
            FROM AddToCart ac
            JOIN products p ON ac.product_id = p.product_id
            WHERE ac.user_id = ?
        `;
        db.query(sql, [userId], (err, results) => {
            if (err) {
                console.error("Error fetching cart:", err);
                return callback(err);
            }
            callback(null, results);
        });
    },

    updateCartQuantity: (cartItemId, quantity, callback) => {
        const sql = `
            UPDATE AddToCart SET quantity = ? WHERE cart_item_id = ?
        `;
        db.query(sql, [quantity, cartItemId], (err, result) => {
            if (err) {
                console.error("Error updating cart quantity:", err);
                return callback(err);
            }
            callback(null, result);
        });
    },

    removeFromCart: (cartItemId, callback) => {
        const sql = `DELETE FROM AddToCart WHERE cart_item_id = ?`;
        db.query(sql, [cartItemId], (err, result) => {
            if (err) {
                console.error("Error removing item from cart:", err);
                return callback(err);
            }
            callback(null, result);
        });
    }
};

module.exports = AddToCart;
