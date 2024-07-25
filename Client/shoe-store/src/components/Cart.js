import React from 'react';
import { Modal, ListGroup, Button } from 'react-bootstrap';
import CartItem from './CartItem';
import { useNavigate } from 'react-router-dom';

const Cart = ({ cart, updateQuantity, deleteItem, totalPrice, show, onClose }) => {

    const navigate = useNavigate();
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
                <Button variant='primary' onClick={() => { navigate('/order'); onClose(); }} >
                    Order Now
                </Button>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Cart;
