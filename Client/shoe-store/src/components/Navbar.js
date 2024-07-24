import React from 'react';
import { Navbar as BootstrapNavbar, Nav, Button } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';

const Navbar = ({ cart, toggleCart }) => {
    return (
        <BootstrapNavbar bg="light" expand="lg" className="mb-4">
            <BootstrapNavbar.Brand href="#home">My Store</BootstrapNavbar.Brand>
            <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
            <BootstrapNavbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/order">Order</Nav.Link>
                </Nav>
                <Button variant="outline-primary" onClick={toggleCart}>
                    <FaShoppingCart /> Cart ({cart.length})
                </Button>
            </BootstrapNavbar.Collapse>
        </BootstrapNavbar>
    );
};

export default Navbar;
