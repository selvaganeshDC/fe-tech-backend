const db = require('../config/db');

const Product = {
    //add new product model
    addProduct: (product, callback) => {
        const productSql = `
            INSERT INTO products 
            (name, mrp_rate, technicians_rate, distributors_rate, brand_name, product_description, stocks, how_to_use, composision, item_details) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const productValues = [
            product.name, product.mrp_rate, product.technicians_rate,
            product.distributors_rate, product.brand_name, product.product_description,
            product.stocks, product.how_to_use, product.composision, product.item_details
        ];

        // Insert product details
        db.query(productSql, productValues, (err, result) => {
            if (err) return callback(err);

            const lastInsertedId = result.insertId;
            const customId = 'FE' + lastInsertedId.toString().padStart(2, '0');

            // Update to set custom product_id like FE01
            const updateSql = `
                UPDATE products
                SET product_id = ?
                WHERE id = ?
            `;
            db.query(updateSql, [customId, lastInsertedId], (err) => {
                if (err) return callback(err);

                // Insert images
                if (product.images && product.images.length > 0) {
                    const imageSql = 'INSERT INTO product_images (product_id, image_path) VALUES ?';
                    const imageValues = product.images.map(image => [customId, image]);

                    db.query(imageSql, [imageValues], callback);
                } else {
                    callback(null, { product_id: customId });
                }
            });
        });
    },

    //get all products with the first image and details
    getAllProducts: (callback) => {
        const sql = `
            SELECT products.product_id, products.name, products.mrp_rate, products.brand_name, MIN(product_images.image_path) AS first_image
            FROM products
            LEFT JOIN product_images ON products.product_id = product_images.product_id
            GROUP BY products.product_id
        `;

        db.query(sql, (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    }
};

module.exports = Product;
