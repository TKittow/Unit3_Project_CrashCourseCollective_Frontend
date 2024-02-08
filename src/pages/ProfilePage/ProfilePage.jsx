//! Imports
import { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import AddProjectModal from '../../components/AddProjectModal'
import { useProjects } from '../../context/ProjectContext'
import { useUsers } from "../../context/UserContext"
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './ProfilePage.css'
import ProjectCard from '../../components/ProjectCard'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'


 
export default function ProfilePage({ userData }){
  const { getUserDetails, userDetails, userDetailsF, cohorts } = useUsers()
  const [showModal, setShowModal] = useState(false)
  const { getProjects, getUserProjects, userProjects } = useProjects()
  const { username } = useParams()

 //? Modal Logic
  function handleClose(){
    setShowModal(false)
  }

  useEffect(() => {
    if (userDetailsF.username === username){
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
let reversedUserProjects = userProjects.reverse()

return (
  <>  
    <Container id="profileContainer"> 
    {/* <iframe title='project' src="https://joelleli.github.io/Unit1_Project_Snake/" width="400" height="400" aria-hidden="true"></iframe> */}

      <div id='outerInfoContainer'>
        <div id='photoContainer'>
          <Image id='profilePhoto' src={userDetails.userAvatar} alt="UserImage" className='profileImage' roundedCircle fluid/>
        </div>
        <div id='innerInfoContainer'>
          <Card style={{ width: '70vmin' }}>
            <Card.Body>
              <Card.Title>{userDetails.username}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{userDetails.fullName}</Card.Subtitle>
              <Card.Text><Link to={`/cohorts/${userDetails.cohort}`}>{getCohortName(userDetails.cohort)}</Link>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
              </Card.Text>
              <Card.Link href="#">{userDetails.linkedIn}</Card.Link>
              <Card.Link href="#">{userDetails.gitUrl}</Card.Link>
            </Card.Body>
          </Card>
          </div>
        </div>
      <Card>
            <Card.Header>About Me</Card.Header>
            <Card.Body>
              <blockquote id='aboutMe'>
                <p>
                  {' '}{userDetails.aboutMe}{' '}
                </p>
                {/* <footer className="blockquote-footer">
                  Someone famous in <cite title="Source Title">Source Title</cite>
                </footer> */}
              </blockquote>
            </Card.Body>
          </Card>   
    </Container>
    {/* // display public projects for non logged in users */}
    <Button variant='primary' onClick={() => setShowModal(true)}>Add Project</Button>
      <AddProjectModal show={showModal} handleClose={handleClose} userData={userData}/>
      {/* Where the ProjectCard was */}
      <div className='cardHolder'>
        {reversedUserProjects.map((project, idx)=>{
            return <ProjectCard project={project} key={idx} />
        })} 
      </div>
    </>
)

}