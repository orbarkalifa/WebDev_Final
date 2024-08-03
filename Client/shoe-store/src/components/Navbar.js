import React from 'react';
import { Navbar as BootstrapNavbar, Nav, Button } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';

const Navbar = ({ cart, toggleCart }) => {
    // Calculate total quantity in the cart
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <BootstrapNavbar bg="light" expand="lg" className="mb-4">
            <BootstrapNavbar.Brand href="#home">My Store</BootstrapNavbar.Brand>
            <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
            <BootstrapNavbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Button variant="outline-primary" onClick={toggleCart}>
                        <FaShoppingCart /> Cart ({totalQuantity})
                    </Button>
                </Nav>

            </BootstrapNavbar.Collapse>
        </BootstrapNavbar>
    );
};

export default Navbar;
