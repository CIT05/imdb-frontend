import Container from 'react-bootstrap/Container';

const Footer = ()   => {
    return (
        <Container fluid style={{ backgroundColor: '#21252b', width: '100%' }} className='justify-content-center align-items-center'>
            <footer className="footer" style={{color: "white", textAlign:"center"}}>
                <p>© 2024 IMDb</p>
            </footer>
        </Container>
    );
}

export default Footer;