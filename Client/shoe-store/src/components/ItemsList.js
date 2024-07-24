import React, { useState, useEffect } from 'react';

const ItemsList = () => {
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
                    <div key={item._id} className="item">
                        <h2>{item.name}</h2>
                        <p>{item.description}</p>
                        <p>Price: ${item.price.toFixed(2)}</p>
                        <p>Stock: {item.stock}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ItemsList;
