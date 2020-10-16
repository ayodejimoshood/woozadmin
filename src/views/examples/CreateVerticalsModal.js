import React from "react";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Modal,
  Row,
  Col,
} from "reactstrap";
import CreateVerticalsForm from "./CreateVerticalsForm";

class CreateVerticalsModal extends React.Component {
  state = {
    CreateVerticalsForm: false,
  };
  toggleModal = (state) => {
    this.setState({
      [state]: !this.state[state],
    });
  };
  render() {
    return (
      <>
        {/* Button trigger modal */}
        <Button
          color="primary"
          type="button"
          onClick={() => this.toggleModal("CreateVerticalsForm")}
        >
          Create Vertical
        </Button>
        {/* Modal */}
        <Modal
          className="modal-dialog-centered"
          isOpen={this.state.CreateVerticalsForm}
          toggle={() => this.toggleModal("CreateVerticalsForm")}
        >
          <div className="modal-header">
            <h5 className="modal-title" id="CreateVerticalsFormLabel">
              Create Vertical
            </h5>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("CreateVerticalsForm")}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body">
            <CreateVerticalsForm />
          </div>
          <div className="modal-footer">
            <Button
              color="secondary"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("CreateVerticalsForm")}
            >
              Close
            </Button>
            <Button color="primary" type="button">
              Create
            </Button>
          </div>
        </Modal>
      </>
    );
  }
}

export default CreateVerticalsModal;
