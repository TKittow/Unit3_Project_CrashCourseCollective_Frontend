import React from 'react'
import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import './ProjectCard.css'


export default function ProjectCard({project}) {

    let altText = `${project.username}'s avatar`

  const cardStyle = {
    backgroundImage: `url(${ project.deploymentImage })`,
    backgroundSize: 'cover', 
    backgroundPosition: 'center'
    
  }




  return (



<Link to={`/projects/${project._id}`}>
    <Card className={`projectCard ${project.deploymentImage ? 'img' : ''}`} > {/* only if this has the class img */}
        <Card.Body style={cardStyle}>
            <Card.Title>
                <div className='d-flex'>{project.username} </div>
                {project.userAvatarUrl && <img className='d-flex' src={project.userAvatarUrl} alt={altText} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />}
                <div>{project.projectName}</div>
            </Card.Title>
            
            
            <Card.Subtitle>
          {project.collaborators ? `Collaborators: ${project.collaborators}` : 'Solo'}
        </Card.Subtitle>
        </Card.Body>
    </Card>
</Link>
  )
}
