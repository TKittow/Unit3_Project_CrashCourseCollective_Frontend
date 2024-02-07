//! Imports
import { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import AddProjectModal from '../../components/AddProjectModal'
import { useProjects } from '../../context/ProjectContext'
import { useUsers } from "../../context/UserContext"


export default function ProfilePage({ userData }){
  const { getUserDetails, userDetails, userDetailsF } = useUsers()
  const [showModal, setShowModal] = useState(false)
  const { getProjects } = useProjects()

 //? Modal Logic
 function handleClose(){
    setShowModal(false)
  }

  useEffect(() => {
    getUserDetails(userDetailsF.username)
    console.log(userDetails)
    getProjects()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

return (
  <>
    {/* // display public projects for non logged in users */}
    <Button variant='primary' onClick={() => setShowModal(true)}>Add Project</Button>
    <AddProjectModal show={showModal} handleClose={handleClose} userData={userData}/>
  {/* Where the ProjectCard was */}

    <div className="profilePage">        
        <div className='userInfo'>
            <img src={userDetails.avatar_url} alt="UserImage" className='profileImage'/>
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