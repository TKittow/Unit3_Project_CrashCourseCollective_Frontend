import { useContext, createContext, useState } from "react"
import axios from 'axios'

const ProjectContext = createContext()

export function useProjects(){
    return useContext(ProjectContext)
}

export const ProjectsProvider = ({children}) => {
    const [projects, setProjects] = useState([])
    const [userProjects, setUserProjects] = useState([])
    const [userProjectsCollab, setUserProjectsCollab] = useState([])

async function getProjects(){
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/projects`)
    .then(response => {
        setProjects(response.data)
    })
    .catch(err => {
        console.error('Error fetchiing projects', err)
    })
}

async function getUserProjects(username) {
    setUserProjects([])
    try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/projects/collab/${username}`)
        const userProjects = response.data
        setUserProjects(userProjects)

    } catch (error) {
        console.error("Error fetching user details:", error)
        return null
    }
}

async function getUserProjectsCollab(username) {
    setUserProjectsCollab([])
    try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/projects/collab/${username}`)
        const userProjectsCollab = response.data
        setUserProjects(userProjectsCollab)

    } catch (error) {
        console.error("Error fetching user details:", error)
        return null
    }
}



async function addProject(newProject){
    try{
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/project/add`, newProject)
        setUserProjects(prevUserProjects => [...prevUserProjects, response.data])
        setProjects(prevProjects => [...prevProjects, response.data]);
    } catch (err) {
        console.error("Error adding Project", err)
    }
}

return (
    <ProjectContext.Provider value={{
        projects,
        userProjects,
        userProjectsCollab,
        addProject,
        getProjects,
        getUserProjects,
        getUserProjectsCollab,
    }}
    >
        {children}
    </ProjectContext.Provider>
)
}