import React from 'react'
import { Link } from "react-router-dom"
import './ProjectCard.css'
import UnderConstruction from '../images/UnderConstruction.jpg'


export default function ProjectCard({project}) {

    let altText = `${project.username}'s avatar`

  const cardStyle = {
    backgroundImage: project.deploymentImage ? `url(${ project.deploymentImage })` : `url(${UnderConstruction})`,
    backgroundSize: 'cover', 
    backgroundPosition: 'center'
    
  }

let seperated = project.collaborators.split(" ")


  return (



<<<<<<< HEAD
<Link to={`/projects/${project._id}`}>
    <Card className='card' >
        <Card.Body style={cardStyle} >
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
=======
<Link to={`/projects/${project._id}`} style={{textDecoration: 'none'}}>

    <div className='projectCard' style={cardStyle}>
        <div className='imageCard' > 
          <div > 
            <div >{project.username} </div>
            <div>
            {project.userAvatarUrl && <img className='' src={project.userAvatarUrl} alt={altText} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />}
            </div>
          </div>
          <div>{project.projectName}</div>
        </div>
        <div className='collaborators'>
          {project.collaborators ? 
          seperated.map((collaber, idx) => {
            return (
              <>
              <div>&nbsp;</div>
              <div>&nbsp;</div>
            <div className='collaber' key={idx}>{`${collaber}`}</div>
            </>
            )
          })
           : 'Solo'}
        </div>
    </div>
>>>>>>> dev
</Link>
  )
}
