import { Link } from 'react-router-dom'
import './NavBar.css'

export default function NavBar() {
  return (
    <nav>
        <Link to='/'>Home</Link>
        &nbsp; | &nbsp;
        <Link to='/about'>About</Link>
        &nbsp; | &nbsp;
        <Link to='/cohort'>Cohort</Link>
        &nbsp; | &nbsp;
        <Link to='/myPage'>My Page</Link>
        &nbsp; | &nbsp;
        <Link to='/login'>Login</Link>
    </nav>
  )
}
