// src/components/Item.js
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './Item.css';

const Item = ({ item, addToCart }) => {
    return (
        <Card >
            <div>
                <div>
                    <Card.Img src={item.imgUrl} alt={item.name} />
                </div>
            </div>
            <Card.Body >
                <Card.Title >{item.name}</Card.Title>
                <Card.Text >{item.description}</Card.Text>
                <Card.Text >Price: ${item.price.toFixed(2)}</Card.Text>
                <Button onClick={() => addToCart(item)}>
                    Add to Cart
                </Button>
            </Card.Body>
        </Card >
    );
};

export default Item;
