// controllers/ShipmentController.js
const Shipment = require('../model/Shipmentmodel');

exports.updateShipmentDetails = (req, res) => {
    const { shipment_id } = req.params;
    const shipmentData = {
        distributor_id: req.body.distributor_id,
        transport_id: req.body.transport_id,
        dispatch_date: req.body.dispatch_date,
        dispatch_address: req.body.dispatch_address,
        tracking_number: req.body.tracking_number
    };

    // Validate required fields
    const requiredFields = ['distributor_id', 'transport_id', 'dispatch_date', 'dispatch_address'];
    const missingFields = requiredFields.filter(field => !shipmentData[field]);

    if (missingFields.length > 0) {
        return res.status(400).json({ 
            message: 'Missing required fields', 
            fields: missingFields 
        });
    }

    Shipment.updateShipmentDetails(shipment_id, shipmentData, (err, result) => {
        if (err) {
            console.error('Error updating shipment:', err);
            return res.status(500).json({ message: 'Server error', error: err.message });
        }
        res.status(200).json({result});
    });
};

exports.getAllShipments = (req, res) => {
    Shipment.getAllShipments((err, shipments) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching shipments', error: err.message });
        }

        res.status(200).json({ message: 'All shipments fetched successfully', shipments: shipments });
    });
};

// Controller to get details of a particular shipment by shipment_id
exports.getShipmentDetails = (req, res) => {
    const { shipment_id } = req.params;  // Get shipment_id from URL parameter
    
    Shipment.getShipmentDetails(shipment_id, (err, shipment) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching shipment details', error: err.message });
        }

        res.status(200).json({ message: 'Shipment details fetched successfully', shipment: shipment });
    });
};