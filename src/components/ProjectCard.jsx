import React from 'react'
import { Card } from "react-bootstrap"
import { useState, useEffect} from 'react'
import { Link } from "react-router-dom"

export default function ProjectCard({project}) {

    const [avatarUrl, setAvatarUrl] = useState('');

    useEffect(() => {
      // Function to fetch avatar URL
      const fetchAvatar = async () => {
        try {
          const response = await fetch(`https://api.github.com/users/${project.username}`);
          if (response.ok) {
            const userData = await response.json();
            setAvatarUrl(userData.avatar_url);
          } else {
            console.error('Failed to fetch avatar:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching avatar:', error);
        }
      };
  
      fetchAvatar(); // Call the fetchAvatar function when the component mounts
    }, [project.username]); // Run the effect when project.username changes

    let altText = `${project.username}'s avatar`
  return (



<Link to={`/projects/${project.projectName}`}>
    <Card className='card' >
        <Card.Body>
            <Card.Title>
                <div className='d-flex'>{project.username} </div>
                <div>{project.projectName}</div>
            </Card.Title>
            
            {avatarUrl && <img src={avatarUrl} alt={altText} style={{ width: '50px', height: '50px' }} />}
           
        </Card.Body>
    </Card>
</Link>
  )
}
