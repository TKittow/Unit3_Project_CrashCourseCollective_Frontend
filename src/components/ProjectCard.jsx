import React from 'react'
import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"


export default function ProjectCard({project}) {

    let altText = `${project.username}'s avatar`

    console.log(project.collaborators)
  return (



<Link to={`/projects/${project.projectName}`}>
    <Card className='card' >
        <Card.Body>
            <Card.Title>
                <div className='d-flex'>{project.username} </div>
                <div>{project.projectName}</div>
            </Card.Title>
            
            {project.userAvatarUrl && <img src={project.userAvatarUrl} alt={altText} style={{ width: '50px', height: '50px' }} />}
           
        </Card.Body>
    </Card>
</Link>
  )
}
