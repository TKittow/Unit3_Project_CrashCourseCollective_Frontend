import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { useUsers } from "../../context/UserContext"

export default function EditProfilePage({ userData }) {
  const { getUsers } = useUsers()
  const [editUser, setEditUser] = useState(null)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    linkedIn: '',
    cohort: '', 
    aboutMe: ''
  })

  useEffect(() => {
    getUsers()
  }, [getUsers])
  
  const loggedInUser = useUsers.users?.find((user) => user.username === userData.login)

  useEffect(() => {
    console.log(userData)
    if (loggedInUser) {
      // Update the form data with the user's details
      setFormData({
        fullName: loggedInUser.fullName || '',
        email: loggedInUser.email || '',
        linkedIn: loggedInUser.linkedIn || '',
        cohort: loggedInUser.cohort || '',
        aboutMe: loggedInUser.aboutMe || '',
      });
    }
  }, [loggedInUser])

  async function handleSubmit(user) {
    const body = { ...formData, _id : user.id }
    setEditUser(user._id, body)
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

  return (
    <>
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
          placeholder={userData ? userData.login : ""}
          onChange={(e) => handleChange(e)} 
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="email" />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>LinkedIn</Form.Label>
          <Form.Control />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Cohort</Form.Label>
          <Form.Select defaultValue="Choose...">
            <option>Choose...</option>
            <option>...</option>
          </Form.Select>
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Label>About Me</Form.Label>
        <Form.Control placeholder="About Me" />
      </Form.Group>

      <Button variant="primary" type="submit">
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
