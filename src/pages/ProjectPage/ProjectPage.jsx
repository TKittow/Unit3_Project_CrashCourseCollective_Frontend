import { useParams, Link  } from 'react-router-dom'
import { useUsers } from '../../context/UserContext'
import { useEffect, useState } from 'react'
import { Button} from 'react-bootstrap'
import axios from 'axios'
import './ProjectPage.css'
import Card from 'react-bootstrap/Card'
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
      <div id='projectHeaderWrapper'>
        <div id='innerCollabWrapper'>
          {thisProject.collaborators
          ?
          <div>Collaborators</div>
          :
          <div>Created By</div>
          }
          <div id='collabWrapper'>
          {collabDetails.length !== 0 && collabDetails.map((collaber, idx) => {
          return (
          <div id='singleCollabWrapper'>
            <div>
              <Link to={`/profilepage/${collaber.name}`}>
              <img id='collabAvatar' src={collaber.userAvatar} alt={`Avatar of ${collaber.name}`} />
              </Link>
            </div>
            <div>{collaber.name}</div>
          </div>
          )
          })}
          <div id='singleCollabWrapper'>
            <div>
            <Link to={`/profilepage/${userData.login}`}>
              <img id='collabAvatar' src={userDetails.userAvatar} alt="" />
            </Link>
            <div>{userDetails.username}</div>
            </div>
          </div>
          </div>
        </div>
        <div id='buttonTitleWrapper'>
          <div className='btn-primary'>
                    {userData.login === thisProject.username && (
                      <Link to={{ pathname: `/editprojectpage/${thisProject._id}`, state: { projectDetails: thisProject._id }}}>
                        <Button id='updateProjectButton'>Update Project</Button>
                      </Link>
                    )}
                  </div>
          <div id='projectName'>{thisProject.projectName}</div>
        </div>
      </div>
      <hr />
      <div id='cardWrapper'>
      <Card id='aboutProjectCard'>
            <Card.Header>About</Card.Header>
            <Card.Body>
              <div id='projectAboutWrapper'>
                <blockquote>
                  <p>
                    {' '}{thisProject.description}{' '}
                  </p>
                </blockquote>
              </div>
            </Card.Body>
          </Card>
          <Card id='projectInfoCard'>
            <Card.Body id='linksBox'>
                    <div id='linkWrapper'>
                      <img className='linksIcon' src='https://uxwing.com/wp-content/themes/uxwing/download/location-travel-map/globe-line-icon.png' alt='githublogo' width='15vmin' height='15vmin'/>
                      <Link to={thisProject.deploymentLink}>
                        <div>Project</div>
                      </Link>
                    </div>
                    <div id='linkWrapper'>
                      <img className='linksIcon' src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/GitHub_Invertocat_Logo.svg/200px-GitHub_Invertocat_Logo.svg.png' alt='githublogo' width='15vmin' height='15vmin'/>
                      <Link to={thisProject.repoLink}>
                        <div>GitHub</div>
                      </Link>
                    </div>
            </Card.Body>
          </Card>
      </div>
      <hr />
      <iframe src={`${thisProject.deploymentLink}`} title="how to host a website"></iframe>
      {/* <div>
      {collabDetails.length !== 0 && collabDetails.map((collaber, idx) => {
        return (
          <div key={idx}>
          <div>{collaber.name}</div>
          <Link to={{ pathname: `/profilepage/${collaber.name}`}}>{`${collaber.name}'s page`}</Link>
          <img src={collaber.userAvatar} alt="text" />
          </div>
        )
      })}
      </div> */}
    </div>
  )
}