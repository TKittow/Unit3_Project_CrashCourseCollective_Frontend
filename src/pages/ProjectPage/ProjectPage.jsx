import React from 'react'

export default function ProjectPage({ project }) {
  const project = { projectName, description, collaborators, deploymentLlink }
  return (
    <div className='projectPage'>
      <h2>{projectName}</h2>
      <h5>Collaborators: {collaborators.join('. ')}</h5>
      <p>{description}</p>
      <p>Deployment Link: <a href={deploymentLlink}>{deploymentLlink}</a></p>

    </div>
  )
}
