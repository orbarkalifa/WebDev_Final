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
        deliveryType: 14,
    });
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''

    });
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
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {

        e.preventDefault();

        if (!validateForm()) {
            if (errors.cartSize) {
                alert(errors.cartSize);
                window.location.href = '/';
            }
            return;

        } const body = {
            "orderDetails": {
                "items": cart,
                "totalPrice": totalPrice,
                "customer": formData,
            }
        };
        axios({
            method: 'post',
            url: '/order',
            data: body
        })
            .then(function (response) {
                console.log(response);
            }).then()
            .catch(function (error) {
                console.log(error);
            });
        console.log('Form Data:', formData);

        emptyCart();
    };


    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <Container>
            <Navbar cart={cart} toggleCart={() => setShowCart(!showCart)} />

            <Row>

                {cart.map(item => item.quantity > 0 && (
                    <Row className="justify-content-center" key={item._id}>

                        <Col lg={6} key={item._id} className="mb-3">
                            <OrderItem item={item} />
                        </Col>
                    </Row>

                ))}

            </Row>
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
                                isInvalid={errors.name}
                                required
                            />
                        </Form.Group>
                        {errors.name && <span className="error">{errors.name}</span>}

                        <Form.Group controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                isInvalid={errors.email}
                                required
                            />
                        </Form.Group>
                        {errors.email && <span className="error">{errors.email}</span>}


                        <Form.Group controlId="formPhone">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="tel"
                                placeholder="Enter your phone number"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                isInvalid={errors.phone}
                                required
                            />
                        </Form.Group>
                        {errors.phone && <span className="error">{errors.phone}</span>}


                        <Form.Group controlId="formAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter your address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                isInvalid={errors.address}
                                required
                            />
                        </Form.Group>
                        {errors.address && <span className="error">{errors.address}</span>}

                        <Form.Group >
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
                        {errors.deliveryType && <span className="error">{errors.deliveryType}</span>}


                        <h3>total price:${formData.deliveryType === '3' ? (totalPrice + 30).toFixed(2) : totalPrice.toFixed(2)}</h3>
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
        </Container >
    );
}

export default Order;
