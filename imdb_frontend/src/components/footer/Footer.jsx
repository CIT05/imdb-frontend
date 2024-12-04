import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const Footer = ()   => {
    const currentYear = new Date().getFullYear();
    
    return (
        <Container fluid style={{ backgroundColor: '#21252b', position: 'fixed', bottom: 0 }}>
               <Row>
            <footer style={{color: "white", textAlign:"center"}}>
                <p style={{paddingTop: '1rem'}}>© {currentYear} IMDb</p>
            </footer>
            </Row>
        </Container>
    );
}

export default Footer;