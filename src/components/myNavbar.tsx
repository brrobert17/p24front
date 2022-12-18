import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export const MyNavbar = () => {
    return (
        <>

            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Most amazing app</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link href="/reservations">Reservations</Nav.Link>
                        <Nav.Link href="/cars">Cars</Nav.Link>
                        <Nav.Link href="/members">Members</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )

}