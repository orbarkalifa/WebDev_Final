import React from 'react';

const CartItem = ({ item, onUpdateQuantity, onDelete }) => {
    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value, 10);
        onUpdateQuantity(item._id, newQuantity);
    };

    const handleDelete = () => {
        onDelete(item._id);
    };

    return (
        <div className="cart-item">
            <h3>{item.name}</h3>
            <p>Price: ${item.price.toFixed(2)}</p>
            <p>
                Quantity:
                <input
                    type="number"
                    value={item.quantity}
                    onChange={handleQuantityChange}
                    min="1"
                />
            </p>
            <button onClick={handleDelete}>Remove</button>
        </div>
    );
};

export default CartItem;
