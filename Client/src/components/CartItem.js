import React from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';

const CartItem = ({ item, onUpdateQuantity, onDelete }) => {
    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value, 10);
        onUpdateQuantity(item._id, newQuantity);
    };

    const handleDelete = () => {
        onDelete(item._id);
    };

    const totalItemPrice = item.price * item.quantity;

    return (
        <Row className="align-items-center mb-3">
            <Col xs={3}>
                <img src={item.imgUrl} alt={item.name} className="img-fluid" />
            </Col>
            <Col xs={3}>
                <h5>{item.name}</h5>
                <p>Price: ${item.price.toFixed(2)}</p>
            </Col>
            <Col xs={2}>
                <Form.Control
                    type="number"
                    value={item.quantity}
                    onChange={handleQuantityChange}
                    min="1"
                />
            </Col>
            <Col xs={2}>
                <p>Total: ${totalItemPrice.toFixed(2)}</p>
            </Col>
            <Col xs={2}>
                <Button variant="danger" onClick={handleDelete}>Remove</Button>
            </Col>
        </Row>
    );
};

export default CartItem;
