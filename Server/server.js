const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors

const Data = require('./models/dataModel'); // Import your model

const app = express();
const port = 8080;

mongoose.connect('mongodb+srv://Student:webdev2024student@cluster0.uqyflra.mongodb.net/webdev2024');

// Middleware
app.use(express.json());

// Use cors middleware
app.use(cors());


// Endpoints

// Get all items
app.get('/items', async (req, res) => {
    try {
        const items = await Data.find({ type: 'item' });
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new item
app.post('/items', async (req, res) => {
    const item = new Data({ ...req.body, type: 'item' });
    try {
        const newItem = await item.save();
        res.status(201).json(newItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all orders
app.get('/order', async (req, res) => {
    try {
        const orders = await Data.find({ type: 'order' });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new order
app.post('/order', async (req, res) => {
    try {
        // Validate request body
        const { orderDetails } = req.body;

        // Generate a new order number
        const orderNumber = await getNextOrderNumber();

        // Create a new order object
        const order = new Data({
            type: 'order',
            orderDetails: {
                ...orderDetails,
                orderDate: new Date(),
                orderNumber
            }
        });

        // Save the order to the database
        await order.save();

        // Respond with a confirmation message and order number
        res.status(201).json({
            message: 'Order confirmed',
            orderNumber
        });
    } catch (error) {
        // Handle any errors that occur during order creation
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


// Helper functions

const getNextOrderNumber = async () => {
    try {
        // Find the highest order number from the orderDetails embedded documents
        const lastOrder = await Data.findOne({ 'orderDetails.orderNumber': { $exists: true } })
            .sort({ 'orderDetails.orderNumber': -1 })
            .exec();

        // If no orders are found, start with 1
        if (!lastOrder || !lastOrder.orderDetails || !lastOrder.orderDetails.orderNumber) {
            return 1;
        }

        // Return the next order number
        return lastOrder.orderDetails.orderNumber + 1;
    } catch (error) {
        console.error('Error fetching the next order number:', error);
        throw error;
    }
};
