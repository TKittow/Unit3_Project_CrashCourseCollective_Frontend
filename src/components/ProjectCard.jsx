import React from 'react'
import { Card, Stack} from "react-bootstrap"

export default function ProjectCard({project}) {
  return (
    
    <Card className='card'>
        <Card.Body>
            <Card.Title>
                <div className='d-flex'>{project.username}</div>
                <div>{project.projectName}</div>
            </Card.Title>
        </Card.Body>
    </Card>
    
  )
}
