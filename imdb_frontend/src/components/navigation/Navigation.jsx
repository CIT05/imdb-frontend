import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import SearchBar from '../search-bar/SearchBar';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Navigation = () => {
    return (
        <Navbar expand="lg" className="bg-dark" variant="dark" >
            <Container>
                <Navbar.Brand href="#home" className="me-auto">
                    IMDb
                </Navbar.Brand>

                <SearchBar />
                <Nav>
                        <Nav.Link href="#link" target="_blank" rel="noopener noreferrer">
                            <i className="bi bi-person-circle fs-4"></i>
                        </Nav.Link>
                    </Nav>     


            </Container>
        </Navbar>
    );
};

export default Navigation;
