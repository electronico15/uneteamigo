import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ModalPersonalizado = (props) => { // Cambiar el nombre del componente a ModalPersonalizado
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
    
      <Modal isOpen={modal} toggle={toggle} {...props}>
        <ModalHeader toggle={toggle}>{props.title}</ModalHeader>
        <ModalBody style={{}}>
          {props.body}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Do Something
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalPersonalizado; // Cambiar el nombre del componente a ModalPersonalizado y exportarlo
