import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { useUsers } from "../../context/UserContext"

export default function EditProfilePage({userData}) {
  const { userDetails, sendEditUser, getUserDetails, getCohorts, cohorts, userDetailsF } = useUsers()
  const [editUser, setEditUser] = useState(null)
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    linkedIn: '',
    cohort: '', 
    aboutMe: ''
  })

  const loggedInUser = getUserDetails(userDetails.username)
  // console.log(loggedInUser)

  async function handleSubmit(loggedInUser) {
    const body = { ...formData, _id : loggedInUser._id }
    setEditUser(loggedInUser._id, body)
    setEditUser(null)
    setFormData({    
      fullName: '',
      email: '',
      linkedIn: '',
      cohort: '', 
      aboutMe: ''
    })
  }

  function handleChange(e) {
    console.log(e.target.value)    
    setFormData({ ...formData, [e.target.name] : e.target.value })
  }

  useEffect(() => {
    getCohorts()
    console.log("userdetails front end:", userDetailsF)
    console.log(userDetails.username) 
    // if (userDetails.username) {
      // const loggedInUser = getUserDetails(userDetails.username)
      getUserDetails(userDetailsF.username)
      const loggedInUser = userDetails

      console.log(userDetails)
      console.log(loggedInUser)

      setFormData({
        fullName: loggedInUser.fullName || '',
        email: loggedInUser.email || '',
        linkedIn: loggedInUser.linkedIn || '',
        cohort: loggedInUser.cohort || '',
        aboutMe: loggedInUser.aboutMe || '',
      })
  }, [])

  return (
    <>
    <p>{userData.login}</p>
    {localStorage.getItem('accessToken')
    ?
    <>
    <p>Edit My Details</p>
    <Form>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Full Name</Form.Label>
          <Form.Control 
          type="text" 
          name="fullName"
          placeholder={loggedInUser.fullName}
          onChange={(e) => handleChange(e)} 
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Email</Form.Label>
          <Form.Control 
          type="email" 
          name="email"
          placeholder={loggedInUser.email} />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>LinkedIn</Form.Label>
          <Form.Control 
          type="text"
          name="linkedIn"
          placeholder={loggedInUser.linkedIn}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Cohort</Form.Label>
          <Form.Select 
          defaultValue="Choose...">
            <option>Choose...</option>
            {cohorts.map((cohort) => (
            <option key={cohort._id} value={cohort._id}>
              {cohort.cohortName}</option>
              ))}
          </Form.Select>
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Label>About Me</Form.Label>
        <Form.Control 
        type="text"
        name="aboutMe"
        placeholder={loggedInUser.aboutMe} />
      </Form.Group>

      <Button 
      variant="primary" 
      type="submit"
      onClick={() => {
        handleSubmit(loggedInUser)
      }}>
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
