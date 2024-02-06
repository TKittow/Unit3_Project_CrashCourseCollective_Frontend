import React from 'react'

export default function ProjectPage({ project }) {
  const { projectName, description, collaborators, deploymentLlink } = project
  return (
    <div className='projectPage'>
      <h2>{projectName}</h2>
      <h5>Collaborators: {collaborators.join('. ')}</h5>
      <p>{description}</p>
      <p>Deployment Link: <a href={deploymentLlink}>{deploymentLlink}</a></p>

    </div>
  )
}
