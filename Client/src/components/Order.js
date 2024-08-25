import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert, Card } from 'react-bootstrap';
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
        if (!formData.address) newErrors.address = 'Address is required';

        if (cart.length === 0) {
            newErrors.cartSize = 'Cannot order an empty cart';
        } else if (cart.some(item => item.quantity <= 0)) {
            newErrors.cartItems = 'All items must have a quantity greater than 0';
        }

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

        const deliveryFee = formData.deliveryType === '3' ? 30 : 0;
        const totalPriceWithFee = totalPrice + deliveryFee;

        try {
            const body = {
                orderDetails: {
                    items: cart,
                    totalPrice: totalPriceWithFee,
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
        <Container className="py-4">
            <Navbar cart={cart} toggleCart={() => setShowCart(!showCart)} />

            <Row className="mb-4">
                {cart.length > 0 ? (
                    cart.map(item => item.quantity > 0 && (
                        <Col md={12} lg={6} key={item._id} className="mb-3">
                            <Card className="shadow-sm border-0 h-100">
                                <OrderItem item={item} />
                            </Card>
                        </Col>
                    ))
                ) : (
                    <Col>
                        <Alert variant="info">
                            Your cart is empty.
                        </Alert>
                    </Col>
                )}
            </Row>

            {errors.cartSize && (
                <Row className="mb-4">
                    <Col>
                        <Alert variant="danger">
                            {errors.cartSize}
                        </Alert>
                    </Col>
                </Row>
            )}

            {errors.cartItems && (
                <Row className="mb-4">
                    <Col>
                        <Alert variant="danger">
                            {errors.cartItems}
                        </Alert>
                    </Col>
                </Row>
            )}

            {successMessage && (
                <Row className="mb-4">
                    <Col>
                        <Alert variant="success">
                            {successMessage}
                        </Alert>
                    </Col>
                </Row>
            )}

            <Row>
                <Col lg={8} className="mx-auto">
                    <Card className="shadow-sm p-4 border-0">
                        <h2 className="text-center mb-4">Contact Form</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formName" className="mb-3">
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

                            <Form.Group controlId="formEmail" className="mb-3">
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

                            <Form.Group controlId="formPhone" className="mb-3">
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

                            <Form.Group controlId="formAddress" className="mb-3">
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

                            <Form.Group className="mb-4">
                                <Form.Label>Delivery Type</Form.Label>
                                <div>
                                    <Form.Check
                                        type="radio"
                                        label="Standard (14 days)"
                                        name="deliveryType"
                                        value='14'
                                        checked={formData.deliveryType === '14'}
                                        onChange={handleChange}
                                        inline
                                        required
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="Premium (3 days)"
                                        name="deliveryType"
                                        value='3'
                                        checked={formData.deliveryType === '3'}
                                        onChange={handleChange}
                                        inline
                                        required
                                    />
                                </div>
                            </Form.Group>

                            <h3 className="text-center mb-4">
                                Total Price: ${formData.deliveryType === '3' ? (totalPrice + 30).toFixed(2) : totalPrice.toFixed(2)}
                            </h3>
                            <Button type="submit" variant="primary" className="w-100">
                                Submit
                            </Button>
                        </Form>
                    </Card>
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
