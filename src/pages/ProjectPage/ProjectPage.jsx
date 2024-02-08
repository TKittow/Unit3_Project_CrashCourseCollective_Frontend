import { useParams, Link  } from 'react-router-dom'
import { useUsers } from '../../context/UserContext'
import { useEffect, useState } from 'react'
import { Button} from 'react-bootstrap'
import axios from 'axios'

export default function ProjectPage({ projects, userData }) {
  const { projectName } = useParams()
  const { getUserDetails, userDetails } = useUsers()
  const [collabDetails, setCollabDetails] = useState([])

  let thisProject = projects.find((project) => project.projectName === projectName)

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
 if (!inputString){return} //what if it has one person
  let seperated = inputString.split(" ") // 'KiwiCJ JoelleLi'

  seperated.map((user) => ( //['KiwiCJ', 'JoelleLi']
    getUserId(user)
  ))
}



console.log(collabDetails)

  return (
    <div className='projectPage'>
      <h1>{thisProject.projectName}</h1>
      <div className='btn-primary'>
        {userData.login === thisProject.username && (
          <Link to={{ pathname: `/editprojectpage/${thisProject._id}`, state: { projectDetails: thisProject }}}>
            <Button>Update Project</Button>
          </Link>
        )}
      </div>
      <div>
        <div>{thisProject.description}</div>
        <div>{thisProject.deploymentLink}</div>
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
          </div>
        )
      })}
      </div>
      </span>
    </div>
  )
}
