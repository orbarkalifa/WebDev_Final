import React from 'react';
import { Card, Button } from 'react-bootstrap';

const Item = ({ item, addToCart }) => {
    const handleAddToCart = () => {
        addToCart(item);
    };

    return (
        <Card className="mb-4" style={{ width: '18rem' }}>
            <Card.Img variant="top" src={process.env.PUBLIC_URL + item.imgUrl} alt={item.name} />
            <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
                <Card.Text>Price: ${item.price.toFixed(2)}</Card.Text>
                <Card.Text>Stock: {item.stock}</Card.Text>
                <Button variant="primary" onClick={handleAddToCart}>Add to Cart</Button>
            </Card.Body>
        </Card>
    );
};

export default Item;
