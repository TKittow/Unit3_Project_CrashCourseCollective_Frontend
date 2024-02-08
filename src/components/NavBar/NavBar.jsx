import { Link } from 'react-router-dom'
import { Navbar, Container, Nav, NavDropdown, Row, Col } from 'react-bootstrap'
import './NavBar.css'
import { useUsers } from "../../context/UserContext"
import CCCLogo from '../../images/CCClogo.png'

export default function NavBar({ loggedIn, gitHubLogin, handleLogout, userData}) {
const { userDetailsF } = useUsers()

  // const toggleCard = () => {
  //   setCardOpen(!cardOpen)
  // }

const textStyle = {
  textDecoration: 'none', 
  color: 'black'
}

  return (
    <div id='navBar' sticky="top" data-bs-theme="light">
        <Container id='navContainer'>
          <Link to="/">
            <img src={CCCLogo} alt="logo" id="logo" />
          </Link> 
          <div id='linksAccordianWrapper'>     
          <div id='innerNavWrapper'>
            <Link to='/' className='navLinks'>Home</Link> 
            <Link to='/cohorts' className='navLinks'>Cohorts</Link>
            {loggedIn && <Link to={`/profilepage/${userDetailsF.username}`} className='navLinks'>My Page</Link>}
          </div>
              <NavDropdown id='dropDown' title="☰">
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
            </div>    
        </Container>
    </div>
  )
}
