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
import CreateMerchantsForm from "./CreateMerchantsForm";

class CreateMerchantModals extends React.Component {
  state = {
    CreateMerchantsModal: false,
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
          onClick={() => this.toggleModal("CreateMerchantsModal")}
        >
          Create Merchant(s)
        </Button>
        {/* Modal */}
        <Modal
          className="modal-dialog-centered"
          isOpen={this.state.CreateMerchantsModal}
          toggle={() => this.toggleModal("CreateMerchantsModal")}
        >
          <div className="modal-header">
            <h5 className="modal-title" id="CreateMerchantsModalLabel">
              Create Merchant
            </h5>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("CreateMerchantsModal")}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body">
            <CreateMerchantsForm />
          </div>
          <div className="modal-footer">
            <Button
              color="secondary"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("CreateMerchantsModal")}
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

export default CreateMerchantModals;
