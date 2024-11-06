const Product = require('../model/Productmodel');

//add new product
exports.addProduct = (req, res) => {
    const product = req.body;
    const imageFiles = req.files;

    const newProduct = {
        name: product.name,
        mrp_rate: product.mrp_rate,
        technicians_rate: product.technicians_rate,
        distributors_rate: product.distributors_rate,
        brand_name: product.brand_name,
        product_description: product.product_description,
        stocks: product.stocks,
        how_to_use: product.how_to_use,
        composision: product.composision,
        item_details: product.item_details,
        images: imageFiles ? imageFiles.map(file => file.path) : []
    };

    Product.addProduct(newProduct, (err, result) => {
        if (err) {
            console.error('Error adding product:', err);
            res.status(500).json({ message: 'Server Error', error: err });
            return;
        }
        res.status(201).json({ message: 'Product added successfully', product_id: result.product_id });
    });
};

// fetching all products
exports.getAllProducts = (req, res) => {
    Product.getAllProducts((err, products) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching products', error: err });
        }
        res.status(200).json({ products });
    });
};
