import { Link } from 'react-router-dom'
import './NavBar.css'

export default function NavBar() {
  return (
    <nav>
        <Link to='/'>Home</Link>
        <Link to='/about'>About</Link>
        <Link to='/cohort'>Cohort</Link>
        <Link to='myPage'>My Page</Link>
        <Link to='/login'>Login</Link>
    </nav>
  )
}
