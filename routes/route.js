const express = require('express');
const route = express.Router();
const upload = require('../middlewares/multer');
const { addProduct, getAllProducts } = require('../controller/Productcontroller');


route.post('/addProduct', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        addProduct(req, res);
    });
});

route.get('/getAllProducts', getAllProducts);

module.exports = route;
