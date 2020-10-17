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
import CreateHashtagForm from "./CreateHashtagForm";

class CreateHashtagModal extends React.Component {
  state = {
    CreateHashtagModal: false,
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
          onClick={() => this.toggleModal("CreateHashtagModal")}
        >
          Add Hashtag
        </Button>
        {/* Modal */}
        <Modal
          className="modal-dialog-centered"
          isOpen={this.state.CreateHashtagModal}
          toggle={() => this.toggleModal("CreateHashtagModal")}
        >
          <div className="modal-header">
            <h5 className="modal-title" id="CreateHashtagModalLabel">
            Add Hashtag
            </h5>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("CreateHashtagModal")}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body">
            <CreateHashtagForm />
          </div>
          <div className="modal-footer">
            <Button
              color="secondary"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("CreateHashtagModal")}
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

export default CreateHashtagModal;
