// models/ShipmentModel.js
const db = require('../config/db');

const Shipment = {
   
    // Update shipment with details
    updateShipmentDetails: (shipmentId, shipmentData, callback) => {
        const updateSql = `
            UPDATE Shipments 
            SET 
                distributor_id = ?,
                transport_id = ?,
                dispatch_date = ?,
                dispatch_address = ?,
                status = 'Shipment'
            WHERE shipment_id = ?
        `;
    
        db.query(updateSql, [
            shipmentData.distributor_id,
            shipmentData.transport_id,
            shipmentData.dispatch_date,
            shipmentData.dispatch_address,
            shipmentId
        ], (err, result) => {
            if (err) return callback(err);
    
            // Update order status to 'shipping' if all shipments in order are updated to 'Shipment'
            const updateOrderSql = `
                UPDATE Orders o
                SET o.status = (
                    SELECT CASE WHEN COUNT(*) = 0 THEN 'shipping' ELSE o.status END
                    FROM Shipments s
                    WHERE s.order_id = o.order_id AND s.status != 'Shipment'
                )
                WHERE o.order_id = (SELECT order_id FROM Shipments WHERE shipment_id = ?)
            `;
    
            db.query(updateOrderSql, [shipmentId], (err) => {
                if (err) return callback(err);
                callback(null, { 
                    message: 'Shipment updated successfully',
                    shipment_id: shipmentId
                });
            });
        });
    },
    
    // Get detailed shipment information for a single shipment in the required format
    getAllShipments : (callback) => {
        const sql = `
            SELECT 
                s.shipment_id,
                s.order_id,
                s.status as shipment_status,
                o.status as order_status,
                o.order_date,
                o.total_amount,
                GROUP_CONCAT(
                    CONCAT(
                        '{"product_id":"', si.product_id,
                        '","quantity":', si.quantity,
                        ',"price":', si.price,
                        ',"product_name":"', REPLACE(p.name, '"', '\\"'), '"}'
                    )
                ) as items
            FROM Shipments s
            JOIN Orders o ON s.order_id = o.order_id
            JOIN ShipmentItems si ON s.shipment_id = si.shipment_id
            JOIN products p ON si.product_id = p.product_id
            GROUP BY s.shipment_id
            ORDER BY s.created_at DESC;
        `;
        db.query(sql, (err, results) => {
            if (err) return callback(err);
            
            // Parse the items JSON string for each shipment
            const shipments = results.map(row => ({
                ...row,
                items: JSON.parse(`[${row.items}]`)
            }));
    
            callback(null, shipments);
        });
    },
    
    // Model for getting a particular shipment by shipment_id
    getShipmentDetails : (shipmentId, callback) => {
        const sql = `
            SELECT 
                s.shipment_id,
                s.order_id,
                s.status AS shipment_status,
                s.distributor_id,
                s.transport_id,
                s.dispatch_date,
                s.dispatch_address,
                o.status AS order_status,
                o.order_date,
                o.total_amount,
                d.contact_person_name,
                t.travelsName,
                GROUP_CONCAT(
                    CONCAT(
                        '{"product_id": "', si.product_id, '", ',
                        '"quantity": "', si.quantity, '", ',
                        '"price": "', si.price, '", ',
                        '"product_name": "', p.name, '"}'
                    )
                ) AS items
            FROM Shipments s
            JOIN Orders o ON s.order_id = o.order_id
            JOIN ShipmentItems si ON s.shipment_id = si.shipment_id
            JOIN products p ON si.product_id = p.product_id
            LEFT JOIN distributors d ON s.distributor_id = d.id
            LEFT JOIN transport t ON s.transport_id = t.id
            WHERE s.shipment_id = ?
            GROUP BY s.shipment_id;
        `;
        
        db.query(sql, [shipmentId], (err, results) => {
            if (err) return callback(err);
            if (results.length === 0) return callback(new Error('Shipment not found'));
    
            // Parse the items JSON string
            const shipment = {
                ...results[0],
                items: JSON.parse(`[${results[0].items}]`)
            };
    
            callback(null, shipment);
        });
    }
    
    
};

module.exports = Shipment;

