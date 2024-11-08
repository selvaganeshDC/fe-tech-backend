// addToCartController.js
const AddToCart = require('../model/Addtocartmodel');

// Add a product to the cart
exports.addProductToCart = (req, res) => {
    const { productId, userId, quantity } = req.body;

    AddToCart.addProductToCart(productId, userId, quantity, (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Failed to add product to cart" });
        }
        res.json({ message: "Product added to cart successfully", result });
    });
};

// Get all items in the user's cart
exports.getUserCart = (req, res) => {
    const { userId } = req.params;

    AddToCart.getUserCart(userId, (err, cartItems) => {
        if (err) {
            return res.status(500).json({ error: "Failed to retrieve cart" });
        }
        res.json(cartItems);
    });
};

// Update the quantity of a cart item
exports.updateCartQuantity = (req, res) => {
    const { cartItemId } = req.params;
    const { quantity } = req.body;

    AddToCart.updateCartQuantity(cartItemId, quantity, (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Failed to update cart quantity" });
        }
        res.json({ message: "Cart quantity updated successfully", result });
    });
};

// Remove an item from the cart
exports.removeFromCart = (req, res) => {
    const { cartItemId } = req.params;

    AddToCart.removeFromCart(cartItemId, (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Failed to remove item from cart" });
        }
        res.json({ message: "Item removed from cart successfully", result });
    });
};
