import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Navbar from './Navbar';
import Cart from './Cart';
import OrderItem from './OrderItem';
import axios from 'axios';
import useCart from "../hooks/useCart";

function Order() {
    const { cart, updateQuantity, deleteItem, emptyCart } = useCart();
    const [showCart, setShowCart] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        deliveryType: '14',
    });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required';
        else if (/\d/.test(formData.name)) newErrors.name = 'Name cannot contain numbers';
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.phone) newErrors.phone = 'Phone number is required';
        else if (!/^\d{10}$/.test(formData.phone.replace(/-/g, ''))) newErrors.phone = 'Phone number must be 10 digits';
        if (!formData.address) newErrors.address = 'Address is required';
        if (cart.length === 0) newErrors.cartSize = 'Cannot order an empty cart';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            const body = {
                orderDetails: {
                    items: cart,
                    totalPrice: totalPrice,
                    customer: formData,
                }
            };

            const response = await axios.post('/order', body);

            if (response.status === 201) {
                setSuccessMessage(`Thank you for your order! Your order number is ${response.data.orderNumber}.`);
                emptyCart();
            }
        } catch (error) {
            console.error('Error submitting order:', error);
        }
    };

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <Container>
            <Navbar cart={cart} toggleCart={() => setShowCart(!showCart)} />

            <Row className="my-4">
                {cart.length > 0 ? (
                    cart.map(item => item.quantity > 0 && (
                        <Row className="justify-content-center mb-3" key={item._id}>
                            <Col lg={6}>
                                <OrderItem item={item} />
                            </Col>
                        </Row>
                    ))
                ) : (
                    <Col className="text-center">
                        <p>Your cart is empty.</p>
                    </Col>
                )}
            </Row>

            {successMessage && (
                <Row className="justify-content-center mb-4">
                    <Col md={6}>
                        <div className="alert alert-success">
                            {successMessage}
                        </div>
                    </Col>
                </Row>
            )}

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
                                isInvalid={!!errors.name}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.name}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                isInvalid={!!errors.email}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formPhone">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="tel"
                                placeholder="Enter your phone number"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                isInvalid={!!errors.phone}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.phone}
                            </Form.Control.Feedback>
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
                                isInvalid={!!errors.address}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.address}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Delivery Type</Form.Label>
                            <Form.Check
                                type="radio"
                                label="Standard (14 days)"
                                name="deliveryType"
                                value='14'
                                checked={formData.deliveryType === '14'}
                                onChange={handleChange}
                                required
                            />
                            <Form.Check
                                type="radio"
                                label="Premium (3 days)"
                                name="deliveryType"
                                value='3'
                                checked={formData.deliveryType === '3'}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <h3>Total Price: ${formData.deliveryType === '3' ? (totalPrice + 30).toFixed(2) : totalPrice.toFixed(2)}</h3>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
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
