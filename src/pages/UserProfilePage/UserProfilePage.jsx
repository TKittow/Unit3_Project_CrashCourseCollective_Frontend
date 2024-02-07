//! Imports
import { useState, useEffect } from 'react'
import AddProjectModal from '../../components/AddProjectModal'
import {Button } from 'react-bootstrap'
import { useProjects } from '../../context/ProjectContext'
import { useParams } from 'react-router-dom'
import { useUsers } from "../../context/UserContext"
import '../ProfilePage/ProfilePage.css'


export default function ProfilePage({ userData }){
  const { username } = useParams()
  const { getUserDetails, userDetails } = useUsers()
  const [showModal, setShowModal] = useState(false)
  const { getProjects } = useProjects()

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
                <p>{userDetails.aboutMe}</p>  {/* we will need to add in an info part so the user can complete. */}
                <span>{userDetails.html_url}</span>
            </div>
        </div>      
    </div>
    </>
)

}