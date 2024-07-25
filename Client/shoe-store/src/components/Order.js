import React, { useState, useEffect, useCallback } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Navbar from './Navbar';
import Cart from './Cart';
import OrderItem from './OrderItem';
import axios from 'axios';
import useCart from "../hooks/useCart";


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
            "orderDetails": {
                "items": cart,
                "totalPrice": totalPrice,
                "customer": formData,
                "orderDate": Date.now()
            }
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
            <Row>

                <Col>
                    <Col md={8}>
                        {cart.map(item => item.quantity > 0 ? <OrderItem key={item._id} item={item} /> : '')}
                    </Col>
                </Col>
                <Col className="justify-content-md-center">
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
        </Container >
    );
}

export default Order;
