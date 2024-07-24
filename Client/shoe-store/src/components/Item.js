import React from 'react';

const Item = ({ item, addToCart }) => {
    const handleAddToCart = () => {
        addToCart(item);
    };

    return (
        <div className="item">
            <img src={item.imageUrl} alt={item.name} className="item-image" />
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p>Price: ${item.price.toFixed(2)}</p>
            <p>Stock: {item.stock}</p>
            <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
    );
};

export default Item;
