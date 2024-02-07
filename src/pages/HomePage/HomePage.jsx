import ProjectCard from "../../components/ProjectCard"
import { useEffect } from "react"
import { useProjects } from "../../context/ProjectContext"

export default function HomePage({userData}) {
  
  const { projects, getProjects } = useProjects()
  
  console.log(projects)
useEffect(() => {
  getProjects()
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [])

  return (
    <>
    <div>HomePage</div>
    <p>{userData.login}{userData.html_url}</p>
    <div className='cardHolder'>
        This is where the cards should display
        {projects.map((project, idx) => {
          return <ProjectCard project={project} key={idx} />
        })}
        </div>
    </>
  )
}
