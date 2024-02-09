import { Card } from "react-bootstrap"
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
          <div>
            <img id='avatar' src={user.userAvatar} alt={`${user.username}'s avatar`} />
          </div>
          <div className="user-details">
            <Card.Title className="fw-bold">
              {user.fullName}
            </Card.Title>
            <Card.Text className="text-muted" >
              {user.username}
            </Card.Text>
          </div>
        </Card.Body>
    </Card>
    )
    :
    <p>User not found</p>
    }
    </>
  )
}

// d-flex justify-content-between align-items-baseline fw-normal mb-3