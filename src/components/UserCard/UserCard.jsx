import { Button, Card, Stack } from "react-bootstrap"
import { Link } from 'react-router-dom'
import { useUsers } from "../../context/UserContext"
import './UserCard.css'

export default function UserCard({userId}) {
    const { users } = useUsers()
    const user = users.find(user => user._id === userId)

  return (
    <>
    {user
    ?
    (
    <Card id='userCard'
    as={Link} to={`/profilepage/${user.username}`}> 
        <Card.Body>
            <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
            {user.username}
            </Card.Title>
            <img id='avatar' src={user.userAvatar} alt={`${user.username}'s avatar`} />
        </Card.Body>
    </Card>
    )
    :
    <p>User not found</p>
    }
    </>
  )
}
