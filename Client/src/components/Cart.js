import React, { useState, useEffect } from 'react';
import { Modal, ListGroup, Button } from 'react-bootstrap';
import CartItem from './CartItem';
import { useNavigate } from 'react-router-dom';

const Cart = ({ cart, updateQuantity, deleteItem, totalPrice, show, onClose }) => {

    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (cart.length === 0) {
            setError('Cannot place an order with an empty cart.');
        } else {
            setError(''); // Clear the error message when the cart is not empty
        }
    }, [cart]);



    return (
        <Modal show={show} onHide={onClose} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Shopping Cart</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {cart.length === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    <ListGroup>
                        {cart.map(item => (
                            <CartItem
                                key={item._id}
                                item={item}
                                onUpdateQuantity={updateQuantity}
                                onDelete={deleteItem}
                            />
                        ))}
                        <ListGroup.Item className="text-end">
                            <h5>Total: ${totalPrice.toFixed(2)}</h5>
                        </ListGroup.Item>
                    </ListGroup>
                )}
            </Modal.Body>
            <Modal.Footer>
                {error && <span style={{ color: 'red', fontWeight: 'bold', marginLeft: '10px' }}>{error}</span>}

                <Button
                    variant='primary'
                    onClick={() => {

                        navigate('/order');
                        onClose();
                    }}
                    disabled={cart.length === 0}
                >
                    Order Now
                </Button>



            </Modal.Footer>
        </Modal >
    );
};

export default Cart;
