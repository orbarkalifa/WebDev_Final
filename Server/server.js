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


        const orderNumber = await getNextOrderNumber();
        const order = new Data({
            ...req.body, type: 'order', orderDate: new Date(), orderNumber
        });



        await order.save();
        res.status(201).json({ orderNumber }); // Send the order number back to the client
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


// Helper functions

const getNextOrderNumber = async () => {
    // Find the highest order number
    const lastOrder = await Data.findOne({ type: 'order' }).sort({ 'orderDetails.orderNumber': -1 }).exec();

    // If no orders are found, start with 1
    if (!lastOrder) {
        return 1;
    }

    // Return the next order number
    return lastOrder.orderDetails.orderNumber + 1;
};