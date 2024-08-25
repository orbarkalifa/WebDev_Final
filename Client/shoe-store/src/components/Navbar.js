import React from 'react';
import { Navbar as BootstrapNavbar, Nav, Button, Container } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import './Navbar.css'; // Import the CSS file

const Navbar = ({ cart, toggleCart }) => {
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

    return (
        <BootstrapNavbar expand="lg" fixed="top" className="shadow-sm custom-navbar">
            <Container>
                <BootstrapNavbar.Brand href="#home" className="font-weight-bold text-uppercase">
                    <img
                        src="/logo.jpg"
                        width="50"
                        height="50"
                        className="d-inline-block align-top"
                        alt="My Store"
                    />                </BootstrapNavbar.Brand>
                <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
                <BootstrapNavbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/" className="nav-link">
                            Home
                        </Nav.Link>
                        <Nav.Link href="#shop" className="nav-link">
                            Shop
                        </Nav.Link>
                    </Nav>
                    <Nav className="ms-auto d-flex align-items-center">
                        <Button
                            onClick={toggleCart}
                            variant="outline-dark"
                            className="d-flex align-items-center cart-button"
                        >
                            <FaShoppingCart className="mr-2" />
                            <span className="price mr-2">${totalPrice}</span>
                            <span className="badge badge-dark">{totalQuantity}</span>
                        </Button>
                    </Nav>
                </BootstrapNavbar.Collapse>
            </Container>
        </BootstrapNavbar>
    );
};

export default Navbar;
