// src/components/Homepage.js
import React from 'react';
import Cart from './Cart.js';
import ItemsList from './ItemsList.js';

function Homepage() {
    return (
        <div>
            <h1>Welcome to the Homepage!</h1>
            <ItemsList />
            <Cart />
        </div>
    );
}

export default Homepage;
