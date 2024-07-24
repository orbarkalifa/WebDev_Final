const express = require('express');
const mongoose = require('mongoose');
const Data = require('./models/dataModel'); // Import your model

const app = express();
const port = 8080;

mongoose.connect('mongodb+srv://Student:webdev2024student@cluster0.uqyflra.mongodb.net/webdev2024', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Middleware
app.use(express.json());

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
app.get('/orders', async (req, res) => {
    try {
        const orders = await Data.find({ type: 'order' });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new order
app.post('/orders', async (req, res) => {
    const order = new Data({ ...req.body, type: 'order' });
    try {
        const newOrder = await order.save();
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
