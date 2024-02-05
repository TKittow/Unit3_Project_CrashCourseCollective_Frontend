import { Button, Form, Modal } from "react-bootstrap"
import { useRef } from 'react'
import { useUsers } from '../context/UserContext'

export default function AddProjectModal({show, handleClose, userData}) {

    // ? Use Ref needed when ?
    const collabRef = useRef()
    const titleRef = useRef()
    const descriptionRef = useRef()
    const deploymentLinkRef = useRef()
    const {addProject, getProjects } = useUsers()

    async function handleSubmit(e){
        e.preventDefault()
        await addProject({
            projectName: titleRef.current.value,
            username: userData.login,
            collaborators: collabRef.current.value,
            description: descriptionRef.current.value,
            deploymentLink: deploymentLinkRef.current.value
        })
        getProjects()
        handleClose()
    }
  return (
    <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
                <Modal.Title>New Project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Project Title</Form.Label>
                    <Form.Control ref={titleRef} type="text" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="collabs">
                    <Form.Label>Collaborators</Form.Label>
                    {/* Should this fetch from a select menu of those in your  */}
                    <Form.Control ref={collabRef} type="text" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    {/* Should this fetch from a select menu of those in your  */}
                    <Form.Control as="textarea" ref={descriptionRef} type="text" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="deploymentLink">
                    <Form.Label>Deployment Link</Form.Label>
                    {/* Should this fetch from a select menu of those in your  */}
                    <Form.Control ref={deploymentLinkRef} type="text" required />
                </Form.Group>
                <div className="d-flex justify-content-end">
                <Button variant="primary" type="submit">Post</Button>
                </div>
            </Modal.Body>
        </Form>
    </Modal>
  )
}