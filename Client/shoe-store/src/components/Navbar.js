import React from 'react';
import { Navbar as BootstrapNavbar, Nav, Button } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';

const Navbar = ({ cart, toggleCart }) => {
    // Calculate total quantity and price in the cart
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

    return (
        <BootstrapNavbar bg="light" expand="lg" className="mb-4">
            <BootstrapNavbar.Brand href="#home">My Store</BootstrapNavbar.Brand>
            <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
            <BootstrapNavbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">HOME</Nav.Link>
                    <Nav.Link href="#shop">SHOP</Nav.Link>
                    <Button variant="outline-primary" onClick={toggleCart}>
                        <FaShoppingCart /> ${totalPrice} ({totalQuantity})
                    </Button>
                </Nav>
            </BootstrapNavbar.Collapse>
        </BootstrapNavbar>
    );
};

export default Navbar;
