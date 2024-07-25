import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Item from './Item';

const ItemsList = ({ addToCart }) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/items')
            .then(response => response.json())
            .then(data => setItems(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <Container>
            <h1 className="my-4">Items Collection</h1>
            <Row>
                {items.map(item => (
                    <Col key={item._id} xs={12} sm={6} md={4} lg={4}>
                        <Item item={item} addToCart={addToCart} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ItemsList;
