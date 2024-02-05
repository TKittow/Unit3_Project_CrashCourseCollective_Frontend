import { useContext, createContext, useState } from "react"
import axios from 'axios'

const UserContext = createContext()

export function useUsers() {
    return useContext(UserContext)
}

export const UsersProvider = ({children}) => {
    const [projects, setProjects] = useState([])
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
            addUser,
            addProject,
            getProjects
        }}
        >
            {children}
        </UserContext.Provider>
    )
}

