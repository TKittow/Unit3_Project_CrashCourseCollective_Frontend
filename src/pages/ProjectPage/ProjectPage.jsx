import { useParams } from 'react-router-dom'

export default function ProjectPage({ projects }) {

    const { projectName } = useParams()

    let thisProject = projects.find((project) => project.projectName === projectName)

  return (
    <div className='projectPage'>
     <p>{thisProject.projectName}</p>
     <p>test</p>

    </div>
  )
}
