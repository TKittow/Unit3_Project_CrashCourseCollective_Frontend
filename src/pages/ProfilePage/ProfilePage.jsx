//! Imports
import { Button } from 'react-bootstrap'
import { useState } from 'react'
import AddProjectModal from '../../components/AddProjectModal'
import ProjectCard from '../../components/ProjectCard'


export default function ProfilePage({ userData, projects }){
const [showModal, setShowModal] = useState(false)

function openModal() {
    showModal(true)
}
function closeModal() {
    setShowModal(false)
}


return (
    <div className="profilePage">        
        <div className='userInfo'>
            <img src={userData.avatar_url} alt="UserImage" className='profileImage'/>
            <div className='profileInfo'>
                <h2>{userData.name}</h2>
                <p>{userData.info}</p>  {/* we will need to add in an info part so the user can complete. */}
                <span>{userData.html_url}</span>
            </div>
        </div>

        <Button variant='primary' onClick={() => setShowModal(true)}>Add Project</Button>
          <AddProjectModal openModal={showModal} closeModal={closeModal} userData={userData}/>
        
    </div>
)

}