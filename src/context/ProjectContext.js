import { useContext, createContext, useState } from "react"
import axios from 'axios'

const ProjectContext = createContext()

export function useProjects(){
    return useContext(ProjectContext)
}

export const ProjectsProvider = ({children}) => {
    const [projects, setProjects] = useState([])



async function getProjects(){
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
        setProjects(prevProjects => [...prevProjects, response.data]);
    } catch (err) {
        console.error("Error adding Project", err)
    }
}

return (
    <ProjectContext.Provider value={{
        projects,
        addProject,
        getProjects,
    }}
    >
        {children}
    </ProjectContext.Provider>
)
}