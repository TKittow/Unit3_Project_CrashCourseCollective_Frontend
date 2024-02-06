import React from 'react'
import ProjectCard from './ProjectCard';

export default function ProjectGrid({projects, userData}) {

  return (
    projects.map((project, idx) => {
       return <ProjectCard userData={userData} project={project} key={idx}/>
    }
  ))
}
