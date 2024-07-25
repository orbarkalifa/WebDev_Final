import React, { useState, useEffect, useCallback } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Navbar from './Navbar';
import Cart from './Cart';
import OrderItem from './OrderItem';
import axios from 'axios';

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

function Order() {
    const { cart, updateQuantity, deleteItem } = useCart();
    const [showCart, setShowCart] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const body = {
            "items": cart,
            "totalPrice": totalPrice,
            "customer": formData,
            "orderDate": Date.now()

        };
        axios({
            method: 'post',
            url: '/order',
            data: body
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        console.log('Form Data:', formData);
    };


    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <Container>
            <Navbar cart={cart} toggleCart={() => setShowCart(!showCart)} />
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h2>Contact Form</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formPhone">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="tel"
                                placeholder="Enter your phone number"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter your address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col md={8}>
                    {cart.map(item => item.quantity > 0 ? <OrderItem key={item._id} item={item} /> : '')}
                </Col>
                <Col md={4}>
                    <Button variant="primary" onClick={() => setShowCart(true)}>
                        View Cart
                    </Button>
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

export default Order;
