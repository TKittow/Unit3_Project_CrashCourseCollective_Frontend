import { useParams, Link  } from 'react-router-dom'
import { useUsers } from '../../context/UserContext'
import { useEffect, useState } from 'react'
import { Button} from 'react-bootstrap'
import axios from 'axios'
import './ProjectPage.css'

export default function ProjectPage({ projects, userData }) {
  const projectId = useParams()
  const { getUserDetails, userDetails } = useUsers()
  const [collabDetails, setCollabDetails] = useState([])
  let thisProject = projects.find((project) => project._id === projectId._id)

  useEffect(() => {
    getUserDetails(thisProject.username)
    checkMultipleCollaborators(thisProject.collaborators)
// eslint-disable-next-line react-hooks/exhaustive-deps
 }, [])




 async function getUserId(username) {
  console.log(collabDetails)
  try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/${username}`)
      const user = response.data
      setCollabDetails(collabDetails => [...collabDetails, ({
          name: user.username,
          id: user._id,
        userAvatar: user.userAvatar}) ])
      
      

  } catch (error) {
      console.error("Error fetching user details:", error)
      return null
  }
}

  function checkMultipleCollaborators(inputString) {
    if (!inputString){return} 
    let seperated = inputString.split(" ") 

  seperated.map((user) => ( 
    getUserId(user)
  ))
}



  return (
    <div className='projectPage'>
      <h1>{thisProject.projectName}</h1>
      <div className='btn-primary'>
        {userData.login === thisProject.username && (
          <Link to={{ pathname: `/editprojectpage/${thisProject._id}`, state: { projectDetails: thisProject._id }}}>
            <Button>Update Project</Button>
          </Link>
        )}
      </div>
      <div>
        <div>{thisProject.description}</div>
        <div>{thisProject.deploymentLink}</div>
        <div id='collabWrapper'>
        {collabDetails.length !== 0 && collabDetails.map((collaber, idx) => {
        return (
        <div id='singleCollabWrapper'>
          <div>
            <img id='collabAvatar' src={collaber.userAvatar} alt={`Avatar of ${collaber.name}`} />
          </div>
          <div>{collaber.name}</div>
        </div>
        )
      })}
        </div>

      </div>
      <hr />
      <span>
        {userDetails.userAvatar ?  <img src={userDetails.userAvatar} alt="" /> 
        : 
      <div>
        The user: {userDetails.username} does not have an avatar uploaded :(
      </div>
      }
      <div>
      {collabDetails.length !== 0 && collabDetails.map((collaber, idx) => {
        return (
          <div key={idx}>
          <div>{collaber.name}</div>
          <Link to={{ pathname: `/profilepage/${collaber.name}`}}>{`${collaber.name}'s page`}</Link>
          <img src={collaber.userAvatar} alt="text" />
          </div>
        )
      })}
      </div>
      </span>
    </div>
  )
}
