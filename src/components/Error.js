import React from 'react'

import { Modal, Button } from 'react-bootstrap'

const Error = ({ message, clearError }) =>
  message
    ? <Modal show={true} onHide={() => clearError()}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => clearError()}>
            Begrepen
          </Button>
        </Modal.Footer>
      </Modal>
    : null

export default Error