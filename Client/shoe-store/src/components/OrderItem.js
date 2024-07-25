import React from 'react';
import { ListGroup, Image, Row, Col } from 'react-bootstrap';

const OrderItem = ({ item }) => {
    return (
        <ListGroup.Item>
            <Row className="align-items-center">
                <Col xs={4} md={3}>
                    <Image
                        src={item.imgUrl}
                        alt={item.name}
                        fluid
                        rounded
                        className="order-item-img"
                    />
                </Col>
                <Col xs={8} md={9}>
                    <Row>

                        <Col xs={6} md={3}>
                            <p>Quantity: {item.quantity}</p>
                        </Col>
                        <Col xs={6} md={3}>
                            <p>Total Price: ${(item.price * item.quantity).toFixed(2)}</p>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </ListGroup.Item>
    );
};

export default OrderItem;
