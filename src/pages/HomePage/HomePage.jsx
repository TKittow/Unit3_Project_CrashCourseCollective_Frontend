import ProjectCard from "../../components/ProjectCard"
import { useEffect } from "react"
import { useProjects } from "../../context/ProjectContext"

export default function HomePage({userData}) {
  
  const { projects, getProjects } = useProjects()
  let reversedProjects = projects.reverse()


useEffect(() => {
  getProjects()
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [])

  return (
    <>
    <br />
    <div className='cardHolder'>
        {reversedProjects.map((project, idx) => {
          
          return (
            <div className="card">
          <ProjectCard project={project} key={idx} />
          </div>
          )
        })}
        </div>
    </>
  )
}
