//! Imports
import { useState } from 'react'
import Navbar from '../../components/NavBar/NavBar'
import AddProjectModal from '../../components/AddProjectModal'
import ProjectCard from '../../components/ProjectCard'


export default function ProfilePage({ userData, projects }){
const [modalOpen, setModalOpen] = useState(false)

function openModal() {
    setModalOpen(true)
}
function closeModal() {
    setModalOpen(false)
}

function renderProjects() {
    return projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
    ))
}

return (
    <div className="profilePage">
        <Navbar />
        <div className='userInfo'>
            <img src={userData.avatar_url} alt="UserImage" className='profileImage'/>
            <div className='profileInfo'>
                <h2>{userData.name}</h2>
                <p>{userData.info}</p>  {/* we will need to add in an info part so the user can complete. */}
                <span>{userData.html_url}</span>
            </div>
        </div>

        <button onClick={openModal}>Add Project</button>

        <div className="projectGrid">
            {renderProjects()}
        </div>
        {modalOpen && <AddProjectModal onClose={closeModal} />}
    </div>
)

}