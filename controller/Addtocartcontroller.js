const AddToCart = require('../model/AddToCartModel');

// Add a product to the cart
exports.addProductToCart = (req, res) => {
    const { productId, userId, quantity } = req.body;

    // Check for missing input
    if (!productId || !userId || !quantity) {
        return res.status(400).json({ error: "Invalid input: productId, userId, and quantity are required" });
    }

    AddToCart.addProductToCart(productId, userId, quantity, (err, result) => {
        if (err) {
            console.error("Error in addProductToCart:", err);
            // Send detailed error message to client for debugging
            return res.status(500).json({ error: "Failed to add product to cart", details: err.message });
        }
        res.status(201).json({ message: "Product added to cart successfully", result });
    });
};


// Get all items in the user's cart
exports.getUserCart = (req, res) => {
    const { userId } = req.params;

    AddToCart.getUserCart(userId, (err, cartItems) => {
        if (err) {
            return res.status(500).json({ error: "Failed to retrieve cart" });
        }
        res.status(200).json({ cartItems });
    });
};

// Update the quantity of a cart item
exports.updateCartQuantity = (req, res) => {
    const { cartId } = req.params;
    const { quantity } = req.body;

    AddToCart.updateCartQuantity(cartId, quantity, (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Failed to update cart quantity" });
        }
        res.status(200).json({ message: "Cart quantity updated successfully", result });
    });
};

// Remove an item from the cart
exports.removeFromCart = (req, res) => {
    const { cartId } = req.params;

    AddToCart.removeFromCart(cartId, (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Failed to remove item from cart" });
        }
        res.status(200).json({ message: "Item removed from cart successfully", result });
    });
};
