//! Imports
import { useState, useEffect } from 'react'
import AddProjectModal from '../../components/AddProjectModal'
import {Button } from 'react-bootstrap'
import { useProjects } from '../../context/ProjectContext'
import { useParams } from 'react-router-dom'
import { useUsers } from "../../context/UserContext"
import ProjectCard from '../../components/ProjectCard'
import '../ProfilePage/ProfilePage.css'


export default function ProfilePage({ userData }){
  const { username } = useParams()
  const { getUserDetails, userDetails, cohorts } = useUsers()
  const [showModal, setShowModal] = useState(false)
  const { getProjects, getUserProjects, userProjects } = useProjects()

 //? Modal Logic
 function handleClose(){
    setShowModal(false)
  }

  useEffect(() => {
    getUserDetails(username)
    console.log(userDetails)
    getProjects()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username])

  useEffect(()=>{
    getUserProjects(username)
        // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  console.log(userProjects)

  function getCohortName(cohortId) {
    const foundCohort = cohorts.find(cohort => cohort._id === cohortId)
    return foundCohort ? foundCohort.cohortName : "Cohort not found"
  }

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
        <div>
          {userProjects.map((project, idx)=>{
            return <ProjectCard project={project} key={idx} />
          })}
        </div>
    </div>
    </>
)

}