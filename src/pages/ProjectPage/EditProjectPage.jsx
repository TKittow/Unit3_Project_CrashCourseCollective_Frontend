import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useParams } from 'react-router-dom' 
import { useNavigate } from 'react-router-dom'
import { useProjects } from '../../context/ProjectContext'


export default function EditProjectPage() {
  const { projectId } = useParams()
  const { getProjects } = useProjects()
  const [projectDetails, setProjectDetails] = useState({
    projectName: '',
    description: '',
    deploymentLink: '',
    collaborators: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    // Fetch project details based on projectId
    fetchProjectDetails(projectId);
  }, [projectId])


  const fetchProjectDetails = async (projectId) => {

    try {
      // Make API call to fetch project details based on projectId
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/project/${projectId}`) // Update the API endpoint as per your backend
      
      if (response.ok) {
        const data = await response.json()
        setProjectDetails(data)
      } else {
        console.error('Failed to fetch project details')
        
      }
    
    } catch (error) {
      console.error('Error fetching project details:', error)
    }
  }
console.log('proj', projectId);

  const saveEdit = async (e) => {
    e.preventDefault()
    try {
      // Make API call to save updated project details
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/project/${projectId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectDetails),
      })
      if (response.ok) {
        setFormSubmitted(true)
        getProjects()
        navigate(`/projects/${projectId}`)
      } else {
        console.error('Failed to save project details')
      }
    } catch (error) {
      console.error('Error saving project details:', error)
    }
  }

  const deleteProject = async () => {
    try {
      // Make API call to delete project
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/project/${projectId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        console.log('Project deleted successfully');
        // Redirect to projects page or show a success message
      } else {
        console.error('Failed to delete project');
      }
    } catch (error) {
      console.error('Error deleting project:', error);
    }
    navigate(`/profilepage/${projectDetails.username}`)
  };



  const handleChange = (e) => {
    const { name, value } = e.target
    setProjectDetails((prevDetails) => ({ ...prevDetails, [name]: value }))
  }

  return (
    <>
      <p>Edit Project</p>
      <Form onSubmit={saveEdit}>
        <Form.Group className="mb-3" controlId="formProjectName">
          <Form.Label>Project Name</Form.Label>
          <Form.Control
            type="text"
            name="projectName"
            value={projectDetails.projectName}
            placeholder="Enter project name"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={projectDetails.description}
            placeholder="Enter description"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDeploymentLink">
          <Form.Label>Deployment Link</Form.Label>
          <Form.Control
            type="text"
            name="deploymentLink"
            value={projectDetails.deploymentLink}
            placeholder="Enter deployment link"
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Save
        </Button>

        <Button variant="danger" onClick={deleteProject}>
          Delete
        </Button>
      </Form>
      {formSubmitted && <div>Form submitted</div>}
    </>
  );
}
