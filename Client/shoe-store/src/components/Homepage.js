import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Cart from './Cart';
import ItemsList from './ItemsList';

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
        <Container>
            <h1 className="my-4">Welcome to the Homepage!</h1>
            <Row>
                <Col md={8}>
                    <ItemsList addToCart={addToCart} />
                </Col>
                <Col md={4}>
                    <Cart
                        cart={cart}
                        updateQuantity={updateQuantity}
                        deleteItem={deleteItem}
                        totalPrice={totalPrice}
                    />
                </Col>
            </Row>
        </Container>
    );
}

export default Homepage;
