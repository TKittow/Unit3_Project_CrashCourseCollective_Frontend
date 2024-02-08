import { useParams, Link  } from 'react-router-dom'
import { useUsers } from '../../context/UserContext'
import { useEffect } from 'react'
import { Button} from 'react-bootstrap'

export default function ProjectPage({ projects, userData }) {
  const { projectName } = useParams()
  const { getUserDetails, userDetails } = useUsers()

  let thisProject = projects.find((project) => project.projectName === projectName)

  useEffect(() => {
    getUserDetails(thisProject.username)
// eslint-disable-next-line react-hooks/exhaustive-deps
 }, [])




  return (
    <div className='projectPage'>
      <h1>{thisProject.projectName}</h1>
      <div className='btn-primary'>
        {userData.login === thisProject.username && (
          <Link to={{ pathname: '/editprojectpage', state: { projectDetails: thisProject }}}>
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
      <div>{thisProject.collaborators}</div>
      </span>
    </div>
  )
}
