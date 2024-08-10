import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Header.css'; // Import the CSS file for custom styling

function Header() {
    return (
        <div className="header">
            <Container>
                <Row className="justify-content-center text-center text-white">
                    <Col md={12}>
                        <h1 className="header-title">Welcome to ShoeStore</h1>
                        <p className="header-description">
                            Discover the best collection of shoes for every occasion. From stylish sneakers to elegant formal wear, we have something for everyone.
                        </p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Header;
