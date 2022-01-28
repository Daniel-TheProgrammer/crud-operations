import { Modal, Button } from "react-bootstrap";

const ConfirmDialog = (props) => {
  return (
    <Modal
      show={props.showDialog}
      onHide={props.handleDialogNo}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Cancel</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to cancel this item?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleDialogNo}>
          No
        </Button>
        <Button variant="danger" onClick={props.handleDialogYes}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmDialog;
