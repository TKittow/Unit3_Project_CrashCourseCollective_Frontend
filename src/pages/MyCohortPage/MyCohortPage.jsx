import { Container } from "react-bootstrap"
import { useEffect, useState } from "react"
import { useUsers } from "../../context/UserContext"
import UserCard from "../../components/UserCard/UserCard"
import './MyCohortPage.css'

export default function CohortPage() {
  const [userCohort, setUserCohort] = useState(null)
  const { cohorts, userDetails } = useUsers()

  function getUserCohort() {
    const cohortId = userDetails.cohort
    const foundCohort = cohorts.find(cohort => cohort._id === cohortId)
    setUserCohort(foundCohort)
  }

  useEffect(() => {
    if (userDetails.cohort) {
      getUserCohort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <>
    <Container className="my-4 container-flex text-center">
      {userCohort && (
        <div className="cohort-info">
          <h3>My Cohort {userCohort.cohortName}</h3> 
        </div>
        )}
        <div className='cohort-grid'>
          {userCohort && userCohort.alumni.map((user, index) => (
            <UserCard key={index} userId={user} />
          ))}
        </div>
    </Container>
    </>
  )
}