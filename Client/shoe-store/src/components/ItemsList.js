import React, { useState, useEffect } from 'react';
import Item from './Item';

const ItemsList = ({ addToCart }) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        // Fetch items data from API
        fetch('http://localhost:8080/items')
            .then(response => response.json())
            .then(data => setItems(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            <h1>Items Collection</h1>
            <div className="items-list">
                {items.map(item => (
                    <Item key={item._id} item={item} addToCart={addToCart} />
                ))}
            </div>
        </div>
    );
};

export default ItemsList;
