import { Link } from 'react-router-dom'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import './NavBar.css'
import { useUsers } from "../../context/UserContext"



export default function NavBar({ loggedIn, gitHubLogin, handleLogout, userData}) {
const { userDetailsF } = useUsers()

  return (
    <Navbar sticky="top" bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand as={Link} to='/'>CCC(logo?)</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to='/'>Home</Nav.Link> 
            <Nav.Link as={Link} to='/cohort'>Cohort</Nav.Link>
            <Nav.Link as={Link} to={`/profilepage/${userDetailsF.username}`}>My Page</Nav.Link>
              <NavDropdown title="Settings">
                {loggedIn ? (
                <>
                <NavDropdown.Item as={Link} to='/profilepage'>{userData.login}</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/editprofilepage">Edit My Details</NavDropdown.Item>
                  {/* <NavDropdown.Item to="#action4">Report</NavDropdown.Item> */}
                  {/* <NavDropdown.Item to="#action4">Something Else</NavDropdown.Item> */}
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>Log Out</NavDropdown.Item>
                </>
                ) : (
                  <NavDropdown.Item onClick={gitHubLogin}>Log In</NavDropdown.Item>
                )}
                <NavDropdown.Item as={Link} to='/about'>About</NavDropdown.Item>
              </NavDropdown>
          </Nav>
        </Container>
    </Navbar>
  )
}
