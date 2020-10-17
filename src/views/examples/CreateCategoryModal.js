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
import CreateCategoryForm from "./CreateCategoryForm";

class CreateMerchantModals extends React.Component {
  state = {
    CreateCategoryModal: false,
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
          onClick={() => this.toggleModal("CreateCategoryModal")}
        >
          Add Category
        </Button>
        {/* Modal */}
        <Modal
          className="modal-dialog-centered"
          isOpen={this.state.CreateCategoryModal}
          toggle={() => this.toggleModal("CreateCategoryModal")}
        >
          <div className="modal-header">
            <h5 className="modal-title" id="CreateCategoryModalLabel">
            Add Category
            </h5>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("CreateCategoryModal")}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body">
            <CreateCategoryForm />
          </div>
          <div className="modal-footer">
            <Button
              color="secondary"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("CreateCategoryModal")}
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
