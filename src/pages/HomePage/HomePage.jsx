import ProjectCard from "../../components/ProjectCard"
import { useEffect, useState } from "react"
import { useProjects } from "../../context/ProjectContext"

export default function HomePage({userData}) {
  const [flipped, setFlipped] = useState(false)
  const { projects, getProjects } = useProjects()

useEffect(() => {
  getProjects()
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [])

const reversedProjects = flipped ? projects.slice().reverse() : projects;

useEffect(() => {
  if (!flipped) {
    setFlipped(true);
  }
}, [flipped])

  return (
    <>
    <br />
    <div className='cardHolder'>
        {reversedProjects.map((project, idx) => {
          
          return (
          <ProjectCard project={project} key={idx} />
          )
        })}
        </div>
    </>
  )
}
