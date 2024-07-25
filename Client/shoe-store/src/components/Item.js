// src/components/Item.js
import React from 'react';
import { Card, Button } from 'react-bootstrap';

const Item = ({ item, addToCart }) => {
    return (
        <Card className="h-100">
            <Card.Img variant="top" src={item.imgUrl} alt={item.name} />
            <Card.Body className="d-flex flex-column">
                <Card.Title className="text-center">{item.name}</Card.Title>
                <Card.Text className="text-center mb-2">{item.description}</Card.Text>
                <Card.Text className="text-center mb-3">Price: ${item.price.toFixed(2)}</Card.Text>
                <Button variant="primary" onClick={() => addToCart(item)} className="mt-auto">
                    Add to Cart
                </Button>
            </Card.Body>
        </Card>
    );
};

export default Item;
