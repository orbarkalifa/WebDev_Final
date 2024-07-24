import React from 'react';
import CartItem from './CartItem';
import './Cart.css';

const Cart = ({ cart, updateQuantity, deleteItem, totalPrice }) => {
    return (
        <div className="cart">
            <h2>Shopping Cart</h2>
            {cart.map(item => (
                <CartItem
                    key={item._id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onDelete={deleteItem}
                />
            ))}
            <div className="cart-total">
                <strong>Total: </strong>
                <span>${totalPrice.toFixed(2)}</span>
            </div>
        </div>
    );
};

export default Cart;
