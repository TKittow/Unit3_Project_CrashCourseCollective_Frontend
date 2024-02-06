import { useContext, createContext, useState, useEffect } from "react"
import axios from 'axios'

const UserContext = createContext()

export function useUsers() {
    return useContext(UserContext)
}

export const UsersProvider = ({children}) => {
    const [projects, setProjects] = useState([])
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
            const user = response.data;
            console.log(user)
            setUserDetails(user)

        } catch (error) {
            console.error("Error fetching user details:", error)
            return null
        }
    }

    const editUser = async (userId, updatedData) => {
        try {
          const response = await axios.put(`/users/${userId}`, updatedData)
          if (response.status === 200) {
            console.log('User profile updated successfully')
            setUserDetails(updatedData)
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
        .then(() => getCohorts())
        .catch(error => console.error("Error fetching cohorts", error))
    }

    function getProjects(){
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/projects`)
        .then(response => {
            setProjects(response.data)
        })
        .catch(err => {
            console.error('Error fetchiing projects', err)
        })
    }

    async function addProject(newProject){
        try{
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/project/add`, newProject)
            setProjects([...projects, response.data])
        } catch (err) {
            console.error("Error adding Project", err)
        }
    }

    //Edit Projects

    return (
        <UserContext.Provider value={{
            projects,
            users,
            userDetails,
            userDetailsF,
            cohorts,
            addUser,
            getUsers,
            addProject,
            getProjects,
            getUserDetails,
            editUser,
            getCohorts
        }}
        >
            {children}
        </UserContext.Provider>
    )
}