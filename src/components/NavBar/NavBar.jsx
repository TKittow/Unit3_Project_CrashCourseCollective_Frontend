import { Link, NavLink } from 'react-router-dom'
import { Navbar, Container, Nav, NavDropdown, Button, Card } from 'react-bootstrap'
import { useState } from 'react'
import './NavBar.css'


export default function NavBar({ loggedIn, gitHubLogin, handleLogout, userData}) {
  const [cardOpen, setCardOpen] = useState(false)

  const toggleCard = () => {
    setCardOpen(!cardOpen)
  }

  return (
    <Navbar sticky="top" bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand as={Link} to='/'>CCC(logo?)</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to='/'>Home</Nav.Link> 
            <Nav.Link as={Link} to='/cohort'>Cohort</Nav.Link>
            {loggedIn && <Nav.Link as={Link} to='/profilepage'>My Page</Nav.Link>}
              <NavDropdown title="☰">
                {loggedIn ? (
                <>
                <NavDropdown.Item as={Link} to='/profilepage'>{userData.login}</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/editprofilepage">Edit My Details</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>Log Out</NavDropdown.Item>
                </>
                ) : (
                  <NavDropdown.Item onClick={gitHubLogin}>Log In</NavDropdown.Item>
                )}
                <NavDropdown.Item as={Link} to='/about'>About</NavDropdown.Item>
              </NavDropdown>
          </Nav>
          {/* <Button variant='outline-dark' onClick={toggleCard}>
          ☰
          </Button>
          {cardOpen && (
            <Card>
              <Card.Body>
                {loggedIn ? (
                  <>
                    <NavDropdown.Item as={Link} to='/profilepage'>{userData.login}</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/editprofilepage">Edit My Details</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handleLogout}>Log Out</NavDropdown.Item>
                  </>
                ) : (
                  <NavLink as={Link} to='/about'>About</NavLink>
                )}
              </Card.Body>
            </Card>
          )} */}
        </Container>
    </Navbar>
  )
}
