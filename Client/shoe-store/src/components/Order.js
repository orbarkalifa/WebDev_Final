// src/components/Orders.js
import React, { useState } from 'react';
import axios from 'axios';

function Orders() {
    const [itemId, setItemId] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const order = {

        };

        try {
            const response = await axios.post('http://localhost:8080/order', order);
            setMessage(`Order created successfully: ${response.data._id}`);
        } catch (error) {
            console.error('There was an error creating the order!', error);
            setMessage('Error creating order');
        }
    };

    return (
        <div>
            <h1>Submit a New Order</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Item ID:</label>
                    <input
                        type="text"
                        value={itemId}
                        onChange={(e) => setItemId(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Quantity:</label>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        min="1"
                        required
                    />
                </div>
                <button type="submit">Submit Order</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Orders;
