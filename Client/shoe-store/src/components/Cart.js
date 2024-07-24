import React, { useState, useEffect } from 'react';
import CartItem from './CartItem';
import './Cart.css';


const saveCartToLocalStorage = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

const loadCartFromLocalStorage = () => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
};

const Cart = () => {
    const initialCart = loadCartFromLocalStorage();
    const [cart, setCart] = useState(initialCart);

    useEffect(() => {
        saveCartToLocalStorage(cart);
    }, [cart]);



    const updateQuantity = (id, quantity) => {
        setCart(cart.map(item => (item.id === id ? { ...item, quantity } : item)));
    };
    const deleteItem = (id) => {
        setCart(cart.filter(item => item.id !== id));
    };
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    return (
        <div className="cart">
            <h2>Shopping Cart</h2>
            {cart.map(item => (
                <CartItem
                    key={item.id}
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