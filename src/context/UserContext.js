import { useContext, createContext, useState } from "react"
import axios from 'axios'

const UserContext = createContext()

export function useUsers() {
    return useContext(UserContext)
}

export const UsersProvider = ({children}) => {
    const [users, setUsers] = useState([])
    const [userDetails, setUserDetails] = useState({})
    const [userDetailsF, setUserDetailsF] = useState({})
    const [cohorts, setCohorts] = useState([])

    async function addUser(newUser) {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/new`, newUser)
            setUsers([...users, response.data])
            console.log(newUser)
            setUserDetailsF(newUser)
            getUserDetails(newUser.username)
        }
        catch(e) {
            console.error("Error adding User", e)
        }
    }

    function getUsers() {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/users`)
        .then(response => {
            setUsers(response.data)
        })
        .then(() => getUsers())
        .catch(error => console.error("Error fetching users", error))
    }

    async function getUserDetails(username) {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/${username}`)
            const user = response.data
            console.log(user)
            setUserDetails(user)

        } catch (error) {
            console.error("Error fetching user details:", error)
            return null
        }
    }

      const sendEditUser = async (username, updatedData) => {
        try {
            const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/users/${username}`, updatedData)
            if (response.status === 200) {
                console.log('User profile updated successfully', updatedData)
                
                // merge updatedData with userDetails
                setUserDetails(prevUserDetails => ({
                    ...prevUserDetails,
                    ...updatedData
                }));
            } else {
                console.error('Error updating user profile:', response.status)
            }
        } catch (error) {
            console.error('Error updating user profile:', error)
        }
    }

    function getCohorts() {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/cohorts`)
        .then(response => {
            setCohorts(response.data)
        })
        .catch(error => console.error("Error fetching cohorts", error))
    }

    return (
        <UserContext.Provider value={{
            users,
            userDetails,
            userDetailsF,
            cohorts,
            addUser,
            getUsers,
            getUserDetails,
            sendEditUser,
            getCohorts
        }}
        >
            {children}
        </UserContext.Provider>
    )
}