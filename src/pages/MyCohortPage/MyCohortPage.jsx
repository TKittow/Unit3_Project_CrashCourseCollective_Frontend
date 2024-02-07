import { Container } from "react-bootstrap"
import { useEffect, useState } from "react"
import { useUsers } from "../../context/UserContext"
import { useParams } from 'react-router-dom'
import UserCard from "../../components/UserCard/UserCard"
import './MyCohortPage.css'

export default function CohortPage() {
  const [userCohort, setUserCohort] = useState(null)
  const { cohorts, userDetails } = useUsers()
  const { cohortParams } = useParams()

  function getUserCohort() {
    const cohortId = userDetails.cohort
    const foundCohort = cohorts.find(cohort => cohort._id === cohortId)
    setUserCohort(foundCohort)
    console.log(cohortParams)
  }

  useEffect(() => {
    if (userDetails.cohort) {
      getUserCohort()
    }
  },[])

  return (
    <>
    <Container className="my-4">
      {userCohort && (
          <div>My Cohort {userCohort.cohortName}</div>
        )}
        <div id='cohortGrid'>
          {userCohort && userCohort.alumni.map((user, index) => (
            <UserCard key={index} userId={user} />
          ))}
        </div>
    </Container>

    </>
  )
}