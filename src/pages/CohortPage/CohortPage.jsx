import { useEffect, useState } from "react"
import { useUsers } from "../../context/UserContext"
import UserCard from "../../components/UserCard"

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
  },[])

  return (
    <>
    {userCohort && (
        <div>My Cohort {userCohort.cohortName}</div>
      )}
      <div>
        {userCohort && userCohort.alumni.map(user => (
          <UserCard key={user._id} userId={user} />
        ))}
      </div>
    </>
  )
}