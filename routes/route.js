const express = require('express');
const route = express.Router();
const upload = require('../middlewares/multer');
const { addProduct, getAllProducts, getProducts, getProductById } = require('../controller/Productcontroller');


route.post('/addProduct', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        addProduct(req, res);
    });
});

route.get('/getAllProducts', getAllProducts);

route.get('/products', getProducts);

route.get('/productDetail/:id', getProductById);

module.exports = route;
