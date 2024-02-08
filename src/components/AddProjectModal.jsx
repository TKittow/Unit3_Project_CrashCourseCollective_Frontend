import { Button, Form, Modal } from "react-bootstrap"
import { useRef } from 'react'
import { useProjects } from '../context/ProjectContext'

export default function AddProjectModal({show, handleClose, userData}) {

    // ? Use Ref needed when ?
    const collabRef = useRef()
    const titleRef = useRef()
    const descriptionRef = useRef()
    const deploymentLinkRef = useRef()
    const repoLinkRef = useRef()
    const {addProject, getProjects } = useProjects()


    async function handleSubmit(e){
        e.preventDefault()
        await addProject({
            projectName: titleRef.current.value,
            username: userData.login,
            collaborators: collabRef.current.value,
            description: descriptionRef.current.value,
            deploymentLink: deploymentLinkRef.current.value,
            userAvatarUrl: userData.avatar_url,
            repoLink: repoLinkRef.current.value
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
                    <Form.Label>Collaborators &nbsp; <span style={{fontSize: 'small'}}>*case sensetive</span></Form.Label>
                    {/* Should this fetch from a select menu of those in your  */}
                    <Form.Control ref={collabRef} type="text" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    {/* Should this fetch from a select menu of those in your  */}
                    <Form.Control as="textarea" ref={descriptionRef} type="text" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="deploymentLink">
                    <Form.Label>Deployment Link</Form.Label>
                    {/* Should this fetch from a select menu of those in your  */}
                    <Form.Control ref={deploymentLinkRef} type="text" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="repoLink">
                    <Form.Label>GitHub Repo Link</Form.Label>
                    <Form.Control ref={repoLinkRef} type="text"/>
                </Form.Group>
                <div className="d-flex justify-content-end">
                <Button variant="primary" type="submit">Post</Button>
                </div>
            </Modal.Body>
        </Form>
    </Modal>
  )
}