//! Imports
import { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import AddProjectModal from '../../components/AddProjectModal'
import { useProjects } from '../../context/ProjectContext'
import { useUsers } from '../../context/UserContext'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

import './ProfilePage.css'
import ProjectCard from '../../components/ProjectCard'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'

export default function ProfilePage({ userData, loggedIn }){
  const { getUserDetails, userDetails, userDetailsF, cohorts } = useUsers()
  const [showModal, setShowModal] = useState(false)
  const { getProjects, getUserProjects, userProjects } = useProjects()
  const { username } = useParams()

 //? Modal Logic
  function handleClose(){
    getUserProjects(username)
    setShowModal(false)
  }

  useEffect(() => {
    if (userDetailsF.username === username) {
      getUserDetails(userDetailsF.username)
    } else {
      getUserDetails(username)
    }
    getProjects()
    getUserProjects(username)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username])

  function getCohortName(cohortId) {
    const foundCohort = cohorts.find(cohort => cohort._id === cohortId)
    return foundCohort ? foundCohort.cohortName : "Cohort not found"
}
const [reversedUserProjects, setReversedUserProjects] = useState([])

useEffect(() => {
  setReversedUserProjects(userProjects.slice().reverse())
}, [userProjects])

const cardStyle = {
  backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Lightblue_empty_grid.svg/640px-Lightblue_empty_grid.svg.png)',
  backgroundSize: 'cover', 
  backgroundPosition: 'center',
  width: '70vmin'
}

return (
  <>  
    <Container id="profileContainer"> 
      <div id='outerInfoContainer'>
        <div id='photoContainer'>
          <Image id='profilePhoto' src={userDetails.userAvatar} alt="UserImage" className='profileImage' roundedCircle fluid/>
        </div>
        <div id='innerInfoContainer'>
          <Card style={ cardStyle }>
            <Card.Body>
              <div className='profileName'>{userDetails.username}</div>
              <div id='innerInnerInfoWrapper'>
                <div id='infoWrapper'>
                  {userDetails.fullName 
                  ? 
                  <div id='fullName'>{userDetails.fullName}</div> 
                  : 
                  <div></div>
                  }
                  {userDetails.cohort
                  ?
                  <div>
                  My Cohort : <Link to={`/cohorts/${userDetails.cohort}`} className='link'>{getCohortName(userDetails.cohort)}</Link>
                  </div>
                  : 
                  <div></div>
                  }
                </div>
                <div id='vr' className="vr"></div>
                <div id='outerLinksWrapper'>
                  {userDetails.linkedIn
                  ?
                  <div className='linksWrapper'>
                    <img className='linksIcon' src="https://store-images.s-microsoft.com/image/apps.31120.9007199266245564.44dc7699-748d-4c34-ba5e-d04eb48f7960.bc4172bd-63f0-455a-9acd-5457f44e4473?h=210" alt="LinkedIn Icon" width='15vmin' height='15vmin' />
                    <Link to={userDetails.linkedIn} target="_blank" className='link'>My LinkedIn</Link><br></br>
                  </div>
                  :
                  <div></div>
                  }
                  <div className='linksWrapper'>
                    <img className='linksIcon' src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/GitHub_Invertocat_Logo.svg/200px-GitHub_Invertocat_Logo.svg.png' alt='githublogo' width='15vmin' height='15vmin'/>
                    <Link to={userDetails.gitUrl} target="_blank" className='link'>My GitHub</Link>
                  </div>
                  {userDetails.email 
                  ?
                  <div className='linksWrapper'>
                    <img className='linksIcon' src='https://banner2.cleanpng.com/20180526/eio/kisspng-email-computer-icons-gmail-5b093a2abbd322.5464747815273313707693.jpg' alt='githublogo' width='15vmin' height='15vmin'/>
                    <div>{userDetails.email}</div>
                  </div>
                  :
                  <div></div>
                  }
                </div>
              </div>
            </Card.Body>
          </Card>
          </div>
        </div>
        <Card id='aboutMeCard'>
          <Card.Header>About Me</Card.Header>
          <Card.Body>
            <blockquote id='aboutMe'>
              {userDetails.aboutMe
              ?
              <p>
              {' '}{userDetails.aboutMe}{' '}
              </p>
              :
              <div>Work in progress :)</div>
              }
            </blockquote>
          </Card.Body>
        </Card>   
    </Container>
    <div id='myProjectsHeader'>
      <div id='myProjectsTitle'>My Projects</div>
      {loggedIn && userData.login === userDetails.username
      ?
      <Button id='addProjectButton' variant='primary' onClick={() => setShowModal(true)}>Add Project</Button>
      :
      <div></div>
      } 
    </div>
      <AddProjectModal show={showModal} handleClose={handleClose} userData={userData}/>
      <div className='cardHolder'>
        {reversedUserProjects.map((project, idx)=>{
            return <ProjectCard project={project} key={idx} />
        })} 
      </div>
      <br />
    </>
)
}