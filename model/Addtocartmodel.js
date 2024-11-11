const db = require('../config/db'); // Assumes you have a db.js file that sets up MySQL connection

const AddToCart = {
    // Add product to cart or update quantity if already exists
    addProductToCart: (productId, userId, quantity, callback) => {
        // First, check if the user exists
        const checkUserSql = `SELECT id FROM user WHERE id = ?`;
        db.query(checkUserSql, [userId], (err, userResults) => {
            if (err) {
                console.error("Error checking user existence:", err);
                return callback(err);
            }
            if (userResults.length === 0) {
                return callback(new Error("User does not exist"));
            }
    
            // Next, check if the product exists
            const checkProductSql = `SELECT product_id FROM products WHERE product_id = ?`;
            db.query(checkProductSql, [productId], (err, productResults) => {
                if (err) {
                    console.error("Error checking product existence:", err);
                    return callback(err);
                }
                if (productResults.length === 0) {
                    return callback(new Error("Product does not exist"));
                }
    
                // If both user and product exist, proceed to insert or update cart
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
            });
        });
    }
    
    ,
    
    // Fetch user's cart items with the first image for each product
    getUserCart: (userId, callback) => {
        const sql = `
            SELECT 
                ac.cart_id, 
                p.product_id, 
                p.name, 
                ac.quantity, 
                p.mrp_rate,
                pi.image_path AS first_image
            FROM 
                AddToCart ac
            JOIN 
                products p ON ac.product_id = p.product_id
            LEFT JOIN 
                product_images pi ON p.product_id = pi.product_id
            WHERE 
                ac.user_id = ?
            GROUP BY 
                p.product_id
            ORDER BY 
                pi.id ASC  -- Ensures the first image is selected
        `;
        db.query(sql, [userId], (err, results) => {
            if (err) {
                console.error("Error fetching cart:", err);
                return callback(err);
            }
            callback(null, results); // Return cart items with first image for each product
        });
    },

    // Update quantity of a specific cart item
    updateCartQuantity: (cartId, quantity, callback) => {
        const sql = `
            UPDATE AddToCart SET quantity = ? WHERE cart_id = ?
        `;
        db.query(sql, [quantity, cartId], (err, result) => {
            if (err) {
                console.error("Error updating cart quantity:", err);
                return callback(err);
            }
            callback(null, result);
        });
    },

    // Remove a specific item from the cart
    removeFromCart: (cartId, callback) => {
        const sql = `DELETE FROM AddToCart WHERE cart_id = ?`;
        db.query(sql, [cartId], (err, result) => {
            if (err) {
                console.error("Error removing item from cart:", err);
                return callback(err);
            }
            callback(null, result);
        });
    }
};

module.exports = AddToCart;
