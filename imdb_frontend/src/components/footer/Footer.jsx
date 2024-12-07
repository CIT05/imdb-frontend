import Container from 'react-bootstrap/Container';

const Footer = ()   => {
    const currentYear = new Date().getFullYear();
    
    return (
        <Container fluid style={{ backgroundColor: '#21252b', width: '100%', bottom: '0',  }} className='justify-content-center align-items-center'>
            <footer className="footer" style={{color: "white", textAlign:"center", }}>
                <p style={{paddingTop: '1rem'}}>© {currentYear} IMDb</p>
            </footer>
        </Container>
    );
}

export default Footer;