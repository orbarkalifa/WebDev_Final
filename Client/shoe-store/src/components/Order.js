import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Navbar from './Navbar';
import Cart from './Cart';

const saveCartToLocalStorage = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

const loadCartFromLocalStorage = () => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
};

function Order() {
    const initialCart = loadCartFromLocalStorage();
    const [cart, setCart] = useState(initialCart);
    const [showCart, setShowCart] = useState(false);

    useEffect(() => {
        saveCartToLocalStorage(cart);
    }, [cart]);

    const updateQuantity = (id, quantity) => {
        setCart(cart.map(item => (item._id === id ? { ...item, quantity } : item)));
    };

    const deleteItem = (id) => {
        setCart(cart.filter(item => item._id !== id));
    };

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <Container>
            <Navbar cart={cart} toggleCart={() => setShowCart(!showCart)} />
            <Row>
                <Col>
                    {/* Order details and form go here */}
                </Col>
                <Col md={4}>
                    <Cart
                        cart={cart}
                        updateQuantity={updateQuantity}
                        deleteItem={deleteItem}
                        totalPrice={totalPrice}
                        show={showCart}
                        onClose={() => setShowCart(false)}
                    />
                </Col>
            </Row>
            hhassdadas
        </Container>
    );
}

export default Order;
