import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Navbar from './Navbar';
import ItemsList from './ItemsList';
import Cart from './Cart';

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

function Homepage() {
    const { cart, addToCart, updateQuantity, deleteItem } = useCart();
    const [showCart, setShowCart] = useState(false);

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <Container>
            <Navbar cart={cart} toggleCart={() => setShowCart(!showCart)} />
            <Row>
                <Col md={8}>
                    <ItemsList addToCart={addToCart} />
                </Col>
            </Row>
            <Cart
                cart={cart}
                updateQuantity={updateQuantity}
                deleteItem={deleteItem}
                totalPrice={totalPrice}
                show={showCart}
                onClose={() => setShowCart(false)}
            />
        </Container>
    );
}

export default Homepage;
