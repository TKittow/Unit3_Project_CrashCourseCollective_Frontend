import React from 'react'
import { Link } from "react-router-dom"
import './ProjectCard.css'
import UnderConstruction from '../images/UnderConstruction.jpg'

 
export default function ProjectCard({project}) {

  let altText = `${project.username}'s avatar`

  const cardStyle = {
    backgroundImage: project.deploymentImage ? `url(${ project.deploymentImage })` : `url(${UnderConstruction})`,
    backgroundSize: 'cover', 
    backgroundPosition: 'center',
    borderRadius: '14px'
    
  }

  // let numberSmile = project.collaborators.length

let seperated = project.collaborators.split(" ")


  return (



<Link to={`/projects/${project._id}`} style={{textDecoration: 'none'}}>
    <div id='cardInfoWrapper' style={cardStyle}>
      <div className='projectCard' >
        <div className='imageCard' > 
          <div className='innerImageCard'> 
            <div className='placard'>&nbsp;&nbsp;{project.username}&nbsp;&nbsp; </div>
            <div>
            {project.userAvatarUrl && <img className='' src={project.userAvatarUrl} alt={altText} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />}
            </div>
          </div>
        </div>
        <div id='cardProjectTitleWrapper'>
          <div id='cardProjectTitle' style={{display: 'flex', alignSelf: 'flex-end' }}>{project.projectName}</div>
        </div>
        <div className='collaborators'>
          {project.collaborators ? 
          seperated.map((collaber, idx) => {
            return (
              <>
              {/* <div key={idx+numberSmile+idx}>&nbsp;</div>
              <div key={idx+numberSmile*2}>&nbsp;</div> */}
            <div className='collaber' style={{fontWeight: 'bold', color: 'black'}} key={idx}>
              <div className='placard'>
              &nbsp;{`${collaber}`}&nbsp;
              </div>
              </div>
            </>
            )
          })
           : <div >
              <div className='placard italic'>&nbsp;Solo&nbsp;</div>
             </div>}
        </div>
      </div>
    </div>
</Link>
  )
}
