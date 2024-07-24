const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 8080;

mongoose.connect('mongodb+srv://Student:webdev2024student@cluster0.uqyflra.mongodb.net/webdev2024', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(express.json());

// Endpoints

app.get('/', (req, res) => {

});

app.post('/order', async (req, res) => {
    const order = new Order(req.body);
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
