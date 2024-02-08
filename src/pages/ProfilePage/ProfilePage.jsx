//! Imports
import { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import AddProjectModal from '../../components/AddProjectModal'
import { useProjects } from '../../context/ProjectContext'
import { useUsers } from "../../context/UserContext"
import { useParams } from 'react-router-dom'
import './ProfilePage.css'
import ProjectCard from '../../components/ProjectCard'

 
export default function ProfilePage({ userData }){
  const { getUserDetails, userDetails, userDetailsF, cohorts, setUserDetails } = useUsers()
  const [showModal, setShowModal] = useState(false)
  const { getProjects, getUserProjects, userProjects } = useProjects()
  const { username } = useParams()

console.log(userDetailsF)

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
    {/* // display public projects for non logged in users */}
    <Button variant='primary' onClick={() => setShowModal(true)}>Add Project</Button>
    <AddProjectModal show={showModal} handleClose={handleClose} userData={userData}/>
  {/* Where the ProjectCard was */}

    <div className="profilePage">        
        <div className='userInfo'>
            <img id='profilePhoto' src={userDetails.userAvatar} alt="UserImage" className='profileImage'/>
            <div className='profileInfo'>
                <h2>{userDetails.username}</h2>
                <h2>{userDetails.fullName}</h2>
                <h2>{userDetails.linkedIn}</h2>
                <h2>{getCohortName(userDetails.cohort)}</h2>
                <p>{userDetails.aboutMe}</p>  {/* we will need to add in an info part so the user can complete. */}
                <span>{userDetails.html_url}</span>
            </div>
        </div>  
        <div></div>    
        <div className='projectCards'>
        {userProjects.length > 0 && reversedUserProjects.map((project, idx)=>{
            return (
                <div className='projectCard' key={idx+userProjects.length+1}>
                    <ProjectCard project={project} key={idx} />
                </div>
            )
        })}

        </div>
    </div>
    </>
)

}