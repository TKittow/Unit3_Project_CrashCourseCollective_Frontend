import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { useUsers } from "../../context/UserContext"

export default function EditProfilePage({userData}) {
  const { userDetails, getUserDetails, getCohorts, cohorts, userDetailsF, sendEditUser } = useUsers()
  const [editUser, setEditUser] = useState(null)
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    linkedIn: '',
    cohort: '', 
    aboutMe: ''
  })

  // console.log(loggedInUser)

  async function saveEdit(userDetails, e) {
    e.preventDefault()

    const body = { ...formData, username: userDetails.username }
    await sendEditUser(userDetails.username, body)

    setEditUser(null)
    setFormData({    
      fullName: '',
      email: '',
      linkedIn: '',
      cohort: '', 
      aboutMe: ''
    })
    console.log("formdata: ", formData)
  }

  // function handleChange(e) {
  //   console.log(e.target.value)    
  //   setFormData({ ...formData, [e.target.name] : e.target.value })
  // }

  function handleChange(e) {
    const { name, value } = e.target
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }))
  }

  useEffect(() => {
    getCohorts()
    console.log("userdetails front end:", userDetailsF)
    // getUserDetails(userDetailsF.username)
    console.log("user details back end:", userDetails)
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
          placeholder={userDetails.fullName}
          onChange={(e) => handleChange(e)} 
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Email</Form.Label>
          <Form.Control 
          type="email" 
          name="email"
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
          placeholder={userDetails.linkedIn}
          onChange={(e) => handleChange(e)} 
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Cohort</Form.Label>
          <Form.Select 
          name="cohortName"
          defaultValue={userDetails.cohort ? userDetails.cohort : 'Choose...'}
          onChange={(e) => handleChange(e)}
          >
            <option disabled>Choose...</option>
            {cohorts.map((cohort) => (
              <option key={cohort._id} value={cohort._id}>
                {cohort._id === userDetails.cohort ? cohort.cohortName : cohort.cohortName}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Label>About Me</Form.Label>
        <Form.Control 
        type="text"
        name="aboutMe"
        placeholder={userDetails.aboutMe} 
        onChange={(e) => handleChange(e)} 
        />
      </Form.Group>

      <Button 
      variant="primary" 
      type="submit">
        Submit
      </Button>
    </Form>
    </>
    : 
    <p>Sign in to see your profile</p>
  }
    </>
  )
}
