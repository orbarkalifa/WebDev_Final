import { useState, useEffect, useCallback } from 'react';


// Custom hook for cart state management
const useCart = () => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = useCallback((item) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(cartItem => cartItem._id === item._id);
            if (existingItem) {
                return prevCart.map(cartItem =>
                    cartItem._id === item._id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            } else {
                return [...prevCart, { ...item, quantity: 1 }];
            }
        });
    }, []);

    const updateQuantity = useCallback((id, quantity) => {
        setCart(prevCart =>
            prevCart.map(item =>
                item._id === id ? { ...item, quantity } : item
            )
        );
    }, []);

    const deleteItem = useCallback((id) => {
        setCart(prevCart => prevCart.filter(item => item._id !== id));
    }, []);

    return {
        cart,
        addToCart,
        updateQuantity,
        deleteItem
    };
};


export default useCart;