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
import CreateHashtagEntryForm from "./CreateHashtagEntryForm";

class CreateHashtagEntryModal extends React.Component {
  state = {
    CreateHashtagEntryModal: false,
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
          onClick={() => this.toggleModal("CreateHashtagEntryModal")}
        >
          Create An Hashtag Entry
        </Button>
        {/* Modal */}
        <Modal
          className="modal-dialog-centered"
          isOpen={this.state.CreateHashtagEntryModal}
          toggle={() => this.toggleModal("CreateHashtagEntryModal")}
        >
          <div className="modal-header">
            <h5 className="modal-title" id="CreateHashtagEntryModalLabel">
            Create An Hashtag Entry
            </h5>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("CreateHashtagEntryModal")}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body">
            <CreateHashtagEntryForm />
          </div>
          <div className="modal-footer">
            <Button
              color="secondary"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("CreateHashtagEntryModal")}
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

export default CreateHashtagEntryModal;
