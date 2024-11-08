const express = require('express');
const route = express.Router();
const {uploadDistributorImage, uploadProductImages} = require('../middlewares/multer');
//User routes

const {registerUser, loginUser} = require('../controller/Usercontroller');
route.post('/registerUser', registerUser);
route.post('/loginUser', loginUser)
//Product routes
const { addProduct, getAllProducts, getProducts, getProductById, deleteProduct } = require('../controller/Productcontroller');


route.post('/addProduct', (req, res) => {
    uploadProductImages(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        addProduct(req, res);
    });
});// Add new product
route.get('/getAllProducts', getAllProducts); //Get all products
route.get('/products', getProducts); // Get products for admin dashboard
route.get('/productDetail/:id', getProductById); //Get product by id for product detail
route.delete('/deleteProductById/:id', deleteProduct); // Delete product by ID
// Distributors routes
const {addDistributor, getAllDistributors, getDistributorById, deleteDistributor, updateDistributor } = require('../controller/Distributorscontroller');

route.post('/addDistributor', (req, res)=>{
    uploadDistributorImage(req, res, (err)=>{
        if(err){
            return res.status(400).json({message:err.message});
        }
        addDistributor(req, res);
    })
});// Add new distributor
route.get('/getAllDistributors', getAllDistributors); //Get all distributors
route.get('/getDistributorById/:id', getDistributorById); // Get distriboutor by id for distributor's details
route.put('/updateDistributorById/:id', (req, res) => {
    uploadDistributorImage(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        updateDistributor(req, res);
    });
}); // update distributors details by id
route.delete('/deleteDistributtorById/:id', deleteDistributor); // detele distributor by id
module.exports = route;
