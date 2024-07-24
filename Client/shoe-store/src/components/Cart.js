import React from 'react';
import { Offcanvas, ListGroup } from 'react-bootstrap';
import CartItem from './CartItem';
import './Cart.css'; // Ensure you add styles for fixed or floating cart

const Cart = ({ cart, updateQuantity, deleteItem, totalPrice, show, onClose }) => {
    return (
        <Offcanvas show={show} onHide={onClose} placement="end" className="cart-offcanvas">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
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
                        <ListGroup.Item className="text-right">
                            <h5>Total: ${totalPrice.toFixed(2)}</h5>
                        </ListGroup.Item>
                    </ListGroup>
                )}
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default Cart;
