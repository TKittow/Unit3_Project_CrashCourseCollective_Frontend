import { Link } from 'react-router-dom'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import './NavBar.css'

export default function NavBar() {
  return (
    <Navbar sticky="top" bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand as={Link} to='/'>CCC(logo?)</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to='/'>Home</Nav.Link>
            <Nav.Link as={Link} to='/about'>About</Nav.Link>
            <Nav.Link as={Link} to='/cohort'>My Cohort</Nav.Link>
            <Nav.Link as={Link} to='/profilepage'>My Page</Nav.Link>
            <Nav.Link as={Link} to='/'>Login</Nav.Link>
            <NavDropdown title="Settings">
              <NavDropdown.Item as={Link} to="/editprofilepage">Edit My Details</NavDropdown.Item>
              <NavDropdown.Item to="#action4">Report</NavDropdown.Item>
              <NavDropdown.Item to="#action4">Something Else</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item to="#action5">Log Out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
    </Navbar>
  )
}
