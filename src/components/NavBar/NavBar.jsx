import { Link } from 'react-router-dom'
import { Navbar, Container, Nav, NavDropdown, Row, Col } from 'react-bootstrap'
// import { useState } from 'react'
import './NavBar.css'
import { useUsers } from "../../context/UserContext"
import CCCLogo from '../../images/CCClogo.png'

export default function NavBar({ loggedIn, gitHubLogin, handleLogout, userData}) {
const { userDetailsF } = useUsers()
  // const [cardOpen, setCardOpen] = useState(false)

  // const toggleCard = () => {
  //   setCardOpen(!cardOpen)
  // }

  return (
    <Container id='navContainer'>
    <Navbar id='navBar' sticky="top" data-bs-theme="light">
        <Container>
          <Navbar.Brand as={Link} to='/'></Navbar.Brand>
          <Nav className="me-auto">
          <img src={CCCLogo} alt='logo' id='logo' />
            <Nav.Link as={Link} to='/'>Home</Nav.Link> 
            <Nav.Link as={Link} to='/cohorts'>Cohorts</Nav.Link>
            {loggedIn && <Nav.Link as={Link} to={`/profilepage/${userDetailsF.username}`}>My Page</Nav.Link>}
              <NavDropdown title="☰">
                {loggedIn ? (
                <>
                <NavDropdown.Item as={Link} to={`/profilepage/${userDetailsF.username}`}>{userDetailsF.username}</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/editprofilepage">Edit My Details</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/mycohort">My Cohort</NavDropdown.Item>
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
    </Container>
  )
}
