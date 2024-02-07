import { Container } from "react-bootstrap"
import { useUsers } from "../../context/UserContext"
import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom';
import UserCard from "../../components/UserCard/UserCard";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton'

export default function CohortsPage() {
    const { cohorts } = useUsers()
    const { cohortId } = useParams()
    const [selectedCohort, setSelectedCohort] = useState(null)

    useEffect(() => {
        if (cohortId) {
            const foundCohort = cohorts.find(cohort => cohort._id === cohortId)
            setSelectedCohort(foundCohort)
        } else {
            setSelectedCohort(null)
        }
    }, [cohortId, cohorts])

    function handleSelectCohort(cohort) {
        setSelectedCohort(cohort)
    }

  return (
    <>
    <Container className="my-4">
    <DropdownButton id="dropdown-basic-button" title="Select A Cohort">
        {cohorts.map(cohort => (
            <Dropdown.Item 
            key={cohort._id}
            onClick={() => handleSelectCohort(cohort)}
            >
            {cohort.cohortName}
            </Dropdown.Item>
        ))}
        </DropdownButton>
          <div>Cohort {selectedCohort ? selectedCohort.cohortName : ""}</div>
        <div id='cohortGrid'>
          {selectedCohort && selectedCohort.alumni.map((user, index) => (
            <UserCard key={index} userId={user} />
          ))}
        </div>
    </Container>
    </>
  )
}
