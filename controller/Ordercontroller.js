const Order = require('../model/Ordermodel');

// Controller function to place an order
exports.placeOrder = (req, res) => {
    const userId = req.body.userId;

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    Order.placeOrder(userId, (err, result) => {
        if (err) {
            console.error('Error placing order:', err);
            return res.status(500).json({ message: 'Server error', error: err });
        }
        res.status(201).json(result);
    });
};
