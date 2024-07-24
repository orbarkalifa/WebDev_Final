const mongoose = require('mongoose');

// Define the Schema for both items and orders
const dataSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['item', 'order'],
        required: true
    },
    name: {
        type: String
    },
    price: {
        type: Number
    },
    description: {
        type: String
    },
    stock: {
        type: Number
    },
    orderDetails: {
        items: [{
            itemId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Data' // Reference to the item documents
            },
            quantity: {
                type: Number
            }
        }],
        totalPrice: {
            type: Number
        },
        customer: {
            name: {
                type: String
            },
            email: {
                type: String
            },
            address: {
                type: String
            }
        },
        orderDate: {
            type: Date
        }
    }
}, {
    collection: 'final_Or_Daniel' // Specify the collection name here
});

// Create a model based on the schema
const Data = mongoose.model('Data', dataSchema);

module.exports = Data;
