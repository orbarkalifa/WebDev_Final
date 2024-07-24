// src/components/Homepage.js
import React, { useEffect, useState } from 'react';
import Cart from './Cart.js';
import ItemsList from './ItemsList.js';


const saveCartToLocalStorage = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

const loadCartFromLocalStorage = () => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
};

function Homepage() {
    const initialCart = loadCartFromLocalStorage();
    const [cart, setCart] = useState(initialCart);

    useEffect(() => {
        saveCartToLocalStorage(cart);
    }, [cart]);

    const addToCart = (item) => {
        setCart((prevCart) => {
            const itemInCart = prevCart.find(cartItem => cartItem._id === item._id);
            if (itemInCart) {
                return prevCart.map(cartItem =>
                    cartItem._id === item._id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            } else {
                return [...prevCart, { ...item, quantity: 1 }];
            }
        });
    };

    const updateQuantity = (id, quantity) => {
        setCart(cart.map(item => (item._id === id ? { ...item, quantity } : item)));
    };

    const deleteItem = (id) => {
        setCart(cart.filter(item => item._id !== id));
    };

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div>
            <h1>Welcome to the Homepage!</h1>
            <ItemsList addToCart={addToCart} />
            <Cart
                cart={cart}
                updateQuantity={updateQuantity}
                deleteItem={deleteItem}
                totalPrice={totalPrice}
            />
        </div>
    );
}

export default Homepage;
