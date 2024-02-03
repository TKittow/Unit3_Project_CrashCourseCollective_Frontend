import { Button, Form, Modal } from "react-bootstrap"
import { useRef } from 'react'

export default function AddProjectModal({show, handleClose}) {

    // ? Use Ref needed when ?
    const collabRef = useRef([])
    const titleRef = useRef()
    const descriptionRef = useRef()

    async function handleSubmit(e){
        e.preventDefault()
        await addProject({
            title: titleRef.current.value,
            collaborators: collabRef.current.value,
            description: descriptionRef.current.value
        })
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
                    <Form.Control ref={collabRef} type="number" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>description</Form.Label>
                    {/* Should this fetch from a select menu of those in your  */}
                    <Form.Control as="textarea" ref={descriptionRef} type="number" required />
                </Form.Group>
                <div className="d-flex justify-content-end">
                <Button variant="primary" type="submit">Post</Button>
                </div>
            </Modal.Body>
        </Form>
    </Modal>
  )
}