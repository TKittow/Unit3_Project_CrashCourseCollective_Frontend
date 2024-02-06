import { useUsers } from "../context/UserContext"

export default function UserCard({userId}) {
    const { users } = useUsers()
    const user = users.find(user => user._id === userId)

  return (
    <div>
        {user 
        ? 
        (
        <div>
            <p>Name: {user.fullName}</p>
            <p>Email: {user.email}</p>
            <p>LinkedIn: {user.linkedIn}</p>
        </div>
        ) 
        : 
        (
            <p>User not found</p>
        )}
    </div>
  )
}
