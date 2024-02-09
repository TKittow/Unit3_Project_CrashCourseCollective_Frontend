import React from 'react'
import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"


export default function ProjectCard({project}) {

  let altText = `${project.username}'s avatar`

  const cardStyle = {
    backgroundImage: `url(${ project.deploymentImage })`,
    backgroundSize: 'cover', 
    backgroundPosition: 'center'
    
  }


  return (

<Link to={`/projects/${project._id}`}>
    <Card className='card' >
        <Card.Body>
            <Card.Title>
                <div className='d-flex'>{project.username} </div>
                <div>{project.projectName}</div>
            </Card.Title>
            
            {project.userAvatarUrl && <img src={project.userAvatarUrl} alt={altText} style={{ width: '50px', height: '50px' }} />}
            <Card.Subtitle>
          {project.collaborators ? `Collaborators: ${project.collaborators}` : 'Solo'}
        </Card.Subtitle>
        </Card.Body>
    </Card>
</Link>
  )
}
