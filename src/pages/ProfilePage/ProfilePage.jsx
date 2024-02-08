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
 
export default function ProfilePage({ userData }){
  const { getUserDetails, userDetails, userDetailsF, cohorts } = useUsers()
  const [showModal, setShowModal] = useState(false)
  const { getProjects, getUserProjects, userProjects } = useProjects()
  const { username } = useParams()

<<<<<<< HEAD
=======
console.log(userDetailsF)

>>>>>>> dev
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
    console.log(username)
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
    <div className="profilePage"> 
<<<<<<< HEAD
    {/* <iframe title='project' src="https://joelleli.github.io/Unit1_Project_Snake/" width="400" height="400" aria-hidden="true"></iframe> */}

=======
    {/* <iframe title='project' src="https://joelleli.github.io/Unit1_Project_Snake/" width="400" height="400"></iframe> */}
   
>>>>>>> dev
      <div id='outerInfoContainer'>
        <div id='photoContainer'>
          <img id='profilePhoto' src={userDetails.userAvatar} alt="UserImage" className='profileImage'/>
        </div>
        <div id='innerInfoContainer'>
<<<<<<< HEAD
          <div id='innerInnerInfoContainer'>
            <h3>{userDetails.username}</h3>
            <h6>{userDetails.fullName}</h6>
            <h6>{userDetails.linkedIn}</h6>
            <h6>{userDetails.gitUrl}</h6>
            <Link to={`/cohorts/${userDetails.cohort}`}>{getCohortName(userDetails.cohort)}</Link>
          </div>
          <div id='aboutMe'>{userDetails.aboutMe}</div>
=======
          <h2>{userDetails.username}</h2>
          <h2>{userDetails.fullName}</h2>
          <h2>{userDetails.linkedIn}</h2>
          <Link to={`/cohorts/${userDetails.cohort}`}>{getCohortName(userDetails.cohort)}</Link>
          <p>{userDetails.aboutMe}</p>
          <span>{userDetails.gitUrl}</span>
>>>>>>> dev
        </div>
      </div>    
      {/* // display public projects for non logged in users */}
      <Button variant='primary' onClick={() => setShowModal(true)}>Add Project</Button>
      <AddProjectModal show={showModal} handleClose={handleClose} userData={userData}/>
      {/* Where the ProjectCard was */}
      <div className='cardHolder'>
        {userProjects.map((project, idx)=>{
            return <ProjectCard project={project} key={idx} />
        })} 
      </div>
    </div>
    </>
)

}