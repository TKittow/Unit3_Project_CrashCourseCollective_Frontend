import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { useUsers } from "../../context/UserContext"
import { useNavigate } from 'react-router-dom'

export default function EditProfilePage() {
  const { userDetails, getCohorts, cohorts, sendEditUser } = useUsers()
  const [editUser, setEditUser] = useState(null)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    fullName: userDetails.fullName,
    email: userDetails.email,
    linkedIn: userDetails.linkedIn,
    cohort: '', 
    aboutMe: userDetails.aboutMe
  })

  async function saveEdit(userDetails, e) {
    e.preventDefault()
    const body = { ...formData, username: userDetails.username }

    try {
      await sendEditUser(userDetails.username, body)
      setFormData(body)
      setEditUser(null)
      setFormSubmitted(true) 
    } catch (error) {
      console.error(error)
    }
    navigate(`/profilepage/${userDetails.username}`)

  }

  function handleChange(e) {
    const { name, value } = e.target
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }))
  }

  useEffect(() => {
    getCohorts()
    setFormData({
      fullName: userDetails.fullName,
      email: userDetails.email,
      linkedIn: userDetails.linkedIn,
      cohort: userDetails.cohort,
      aboutMe: userDetails.aboutMe
    })
  }, [])

  return (
    <>
    {localStorage.getItem('accessToken')
    ?
    <>
    <p>Edit My Details</p>
    <Form onSubmit={(e) => saveEdit(userDetails, e)}>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Full Name</Form.Label>
          <Form.Control 
          type="text" 
          name="fullName"
          value={formData.fullName}
          placeholder={userDetails.fullName}
          onChange={(e) => handleChange(e)} 
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Email</Form.Label>
          <Form.Control 
          type="email" 
          name="email"
          value={formData.email}
          placeholder={userDetails.email} 
          onChange={(e) => handleChange(e)} 
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>LinkedIn</Form.Label>
          <Form.Control 
          type="text"
          name="linkedIn"
          value={formData.linkedIn}
          placeholder={userDetails.linkedIn}
          onChange={(e) => handleChange(e)} 
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Cohort</Form.Label>
          <Form.Select 
              name="cohort"
              defaultValue={userDetails.cohort ? userDetails.cohort : 'Choose...'}
              onChange={(e) => handleChange(e)}
            >
              <option disabled>Choose...</option>
              {/* Find the index of the user's cohort in the cohorts array */}
              {userDetails.cohort && cohorts.find(cohort => cohort._id === userDetails.cohort) && (
                <option key={userDetails.cohort} value={userDetails.cohort}>
                  {cohorts.find(cohort => cohort._id === userDetails.cohort).cohortName}
                </option>
              )}
              {/* Map over the remaining cohorts */}
              {cohorts.map((cohort) => {
                // Skip the user's cohort
                if (cohort._id !== userDetails.cohort) {
                  return (
                    <option key={cohort._id} value={cohort._id}>
                      {cohort.cohortName}
                    </option>
                  )
                }
                return null
              })}
            </Form.Select>
            
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Label>About Me</Form.Label>
        <Form.Control 
        as="textarea"
        rows={6}
        name="aboutMe"
        value={formData.aboutMe}
        placeholder={userDetails.aboutMe} 
        onChange={(e) => handleChange(e)} 
        />
      </Form.Group>

      <Button 
      variant="primary" 
      type="submit"
      >
        Submit
      </Button>
    </Form>
    {formSubmitted ? <div>Form submitted</div> : null } 
    </>
    : 
    <p>Sign in to see your profile</p>
  }
    </>
  )
}
