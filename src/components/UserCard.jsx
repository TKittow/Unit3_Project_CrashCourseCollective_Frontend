import { Button, Card, Stack } from "react-bootstrap"
import { Link } from 'react-router-dom'
import { useUsers } from "../context/UserContext"

export default function UserCard({userId}) {
    const { users } = useUsers()
    const user = users.find(user => user._id === userId)

  return (
    <>
    {user
    ?
    (
    <Card 
    style={{ width: '18rem'}}
    as={Link} to={`/profilepage/${user.username}`}> 
        <Card.Body>
            <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
            {user.username}
            </Card.Title>
            <img src={user.userAvatar} alt={`${user.username}'s avatar`} width="50vmin" />
        </Card.Body>
    </Card>
    )
    :
    <p>User not found</p>
    }
    </>
  )
}
