import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CartItem from './CartItem';

const Cart = ({ cart, updateQuantity, deleteItem, totalPrice }) => {
    return (
        <Container>
            <h2 className="my-4">Shopping Cart</h2>
            <Row>
                {cart.map(item => (
                    <CartItem
                        key={item._id}
                        item={item}
                        onUpdateQuantity={updateQuantity}
                        onDelete={deleteItem}
                    />
                ))}
            </Row>
            <Row className="justify-content-end">
                <Col xs={12} md={4} className="text-right">
                    <h3>Total: ${totalPrice.toFixed(2)}</h3>
                </Col>
            </Row>
        </Container>
    );
};

export default Cart;
