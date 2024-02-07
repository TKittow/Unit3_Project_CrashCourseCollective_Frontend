//! Imports
import { Button } from 'react-bootstrap'
import { useState } from 'react'
import AddProjectModal from '../../components/AddProjectModal'
import { useProjects } from '../../context/ProjectContext'
import { useEffect } from 'react'


export default function ProfilePage({ userData }){
const [showModal, setShowModal] = useState(false)
  const { getProjects } = useProjects()

 //? Modal Logic
 function handleClose(){
    setShowModal(false)
  }

  useEffect(() => {
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
            <img src={userData.avatar_url} alt="UserImage" className='profileImage'/>
            <div className='profileInfo'>
                <h2>{userData.name}</h2>
                <p>{userData.info}</p>  {/* we will need to add in an info part so the user can complete. */}
                <span>{userData.html_url}</span>
            </div>
        </div>      
    </div>
    </>
)

}