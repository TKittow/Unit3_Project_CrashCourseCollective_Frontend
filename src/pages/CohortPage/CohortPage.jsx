import { useEffect } from "react"
import { useUsers } from "../../context/UserContext"

export default function CohortPage() {
  const { getCohorts, cohorts, userDetails } = useUsers()

  useEffect(() => {
    getCohorts()
  },[])

  function getUserCohort() {
    const cohortId = userDetails.cohort
    const userCohort = cohorts.find(cohort => cohort._id === cohortId)
    console.log(userCohort)
    return userCohort
  }

  useEffect(() => {
    if (userDetails.cohort) {
      getUserCohort()
    }
  },[])

  const userCohort = getUserCohort()

  return (
    <>
    <div>My Cohort {userCohort.cohortName}</div>
    <ul>
        {userCohort && userCohort.alumni.map(user => (
          <li key={user._id}>{user}</li>
        ))}
      </ul>
    </>
  )
}
