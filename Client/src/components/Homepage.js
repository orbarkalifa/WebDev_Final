import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Navbar from './Navbar';
import ItemsList from './ItemsList';
import Cart from './Cart';
import Header from './Header';
import useCart from "../hooks/useCart";


function Homepage() {
    const { cart, addToCart, updateQuantity, deleteItem } = useCart();
    const [showCart, setShowCart] = useState(false);

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <Container>
            <Navbar cart={cart} toggleCart={() => setShowCart(!showCart)} />
            <Row>
                <Col >
                    <Header />
                </Col>
            </Row>
            <Row>
                <Col>
                    <ItemsList id="shop" addToCart={addToCart} />
                </Col>
            </Row>
            <Cart
                cart={cart}
                updateQuantity={updateQuantity}
                deleteItem={deleteItem}
                totalPrice={totalPrice}
                show={showCart}
                onClose={() => setShowCart(false)}
            />
        </Container>
    );
}

export default Homepage;
