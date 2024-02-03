import { useContext, createContext, useState } from "react"
import axios from 'axios'

const UserContext = createContext()

export function useUsers() {
    return useContext(UserContext)
}

export const UsersProvider = ({children}) => {
    const [users, setUsers] = useState([])

    async function addUser(newUser) {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/new`, newUser)
            setUsers([...users, response.data])
        }
        catch(e) {
            console.error("Error adding User", e)
        }
    }

    return (
        <UserContext.Provider value={{
            addUser
        }}
        >
            {children}
        </UserContext.Provider>
    )
}