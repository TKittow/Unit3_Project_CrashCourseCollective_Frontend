//! Imports
import { useState } from 'react'
import Navbar from './src/components/NavBar/NavBar'
import ProjectCard from './src/components/ProjectCard'
import AddProjectModal from './src/components/AddProjectModal'

export default function ProfilePage( /* {projects, users} */){



return (
    <div className="profilePage">
        <Navbar />
        <div className='userInfo'>
            <img src={userData.avatar_url} alt="Users Image" className='profileImage'/>
            <div>
                <h2>{userData.name}</h2>
                <p>{userData.info}</p>  {/* we will need to add in an info part so the user can complete. */}
                <span>{userData.html_url}</span>
            </div>
        </div>

        <button onClick={openModal}>Add Project</button>

        <div className="projectGrid">
            
        </div>
    </div>
)

}