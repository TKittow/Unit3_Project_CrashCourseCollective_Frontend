import { useParams } from 'react-router-dom'
import { useUsers } from '../../context/UserContext'
import { useEffect} from 'react'

export default function ProjectPage({ projects }) {

    const { projectName } = useParams()
    const { getUserDetails, userDetails } = useUsers()

    let thisProject = projects.find((project) => project.projectName === projectName)

    useEffect(() => {
        getUserDetails(thisProject.username)
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])

     console.log(userDetails)


    

  return (
    <div className='projectPage'>
     <h1>{thisProject.projectName}</h1>
     {userDetails.userAvatar ?  <img src={userDetails.userAvatar} alt="" /> 
     : 
     <div>
        The user: {userDetails.username} does not have an avatar uploaded :(
     </div>
     }
    </div>
  )
}
