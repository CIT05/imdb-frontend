import React, {useState} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import SearchBar from '../search-bar/SearchBar';
import 'bootstrap-icons/font/bootstrap-icons.css';
import style from './Navigation.module.css';

const Navigation = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <Navbar expand={false} className={`bg-dark ${style.navContainer}`} variant="dark" expanded={isExpanded} onToggle={handleToggle}>
            <Container fluid>
                <Navbar.Brand href="/" className={`me-auto ${style.profile}`}>
                    IMDb
                </Navbar.Brand>

                <SearchBar />          
            
                <Navbar.Toggle aria-controls="basic-navbar-nav" className="ms-auto" />

                <Navbar.Collapse id="basic-navbar-nav" className={`me-auto ${style.nav}`}>
                    <Nav>
                        <Nav.Link onClick={handleToggle} className="ms-auto">
                            <i className="bi bi-x-lg"></i>
                        </Nav.Link>
                        <Nav.Link href="/signup">Sign up</Nav.Link>
                        <Nav.Link href="/login">Log in</Nav.Link>
                        <Nav.Link href="/movies">Movies</Nav.Link>
                        <Nav.Link href="/profile">Profile</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
         
                {!isExpanded && (
                    <Nav className={`d-none d-lg-flex ${style.profile}`}>
                        <Nav.Link href="/profile" target="_blank" rel="noopener noreferrer">
                            <i className="bi bi-person-circle fs-4"></i>
                        </Nav.Link>
                    </Nav>
                )}
            </Container>
        </Navbar>
    );
};

export default Navigation;
