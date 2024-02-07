import ProjectCard from "../../components/ProjectCard"
import { useEffect } from "react"
import { useProjects } from "../../context/ProjectContext"

export default function HomePage({userData}) {
  
  const { projects, getProjects } = useProjects()
useEffect(() => {
  getProjects()
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [])

  return (
    <>
    <div>HomePage</div>
    <div className='cardHolder'>
        {projects.map((project, idx) => {
          return <ProjectCard project={project} key={idx} />
        })}
        </div>
    </>
  )
}
