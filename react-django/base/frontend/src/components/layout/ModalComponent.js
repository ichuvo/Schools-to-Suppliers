import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import store from "../../store";
import { create } from "../../actions/auth";
import { createMessage, returnErrors } from "../../actions/messages";

export function ModalComponent(props) {
  const [show, setShow] = useState(false);
  const handleShow = () => {
    if (typeof props.exists === "undefined" || props.exists == false) {
      setShow(false);
      store.dispatch(createMessage({ wrongInput: "No item selected" }));
      return;
    }
    setShow(true);
  };
  const handleClose = () => setShow(false);

  return (
    <>
      <Button variant="link" onClick={handleShow}>
        {props.button}
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.body}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalComponent;
