import React from "react";
import { connect } from "react-redux";
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
import { handleDeleteEntryComment } from "redux/actions/entriesComment";
import { handleAddHashtagEntry } from "redux/actions/socials";

class DeleteEntryCommentsModal extends React.Component {
  state = {
    DeleteEntryCommentsModal: false,
    isMakingRequest: false
  };
  toggleModal = (state) => {
    this.setState({
      [state]: !this.state[state],
    });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }


  handleDelete() {
    const { id, deleteEntryComment } = this.props
    deleteEntryComment(id)
    this.toggleModal("DeleteHashtagModal")
  }


  render() {
    return (
      <>
        {/* Button trigger modal */}
        <Button
          color="danger"
          type="button"
          onClick={() => this.toggleModal("DeleteEntryCommentsModal")}
        >
          Delete
        </Button>
        {/* Modal */}
        <Modal style={{width: '50%'}}
          classNamexx="modal-dialog-centered"
          isOpen={this.state.DeleteEntryCommentsModal}
          toggle={() => this.toggleModal("DeleteEntryCommentsModal")}
        >
          <div className="modal-header">
            <h5 className="modal-title" id="DeleteEntryCommentsModalLabel">
            Delete Entry Comments
            </h5>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("DeleteEntryCommentsModal")}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body">
          
          <Row>
            <Col md="6">
              <Button style={{width: '100%'}} color="danger" type="button" onClick={() => this.handleDelete()}> Yes </Button>
            </Col>

            <Col md="6">
              <Button style={{width: '100%'}} color="success" type="button" onClick={() => this.toggleModal("DeleteEntryCommentsModal")}> No </Button>
            </Col>
          </Row>
       
          </div>
        </Modal>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  deleteEntryComment: (id) => dispatch(handleDeleteEntryComment(id)) 
}) 


export default connect(null, mapDispatchToProps)(DeleteEntryCommentsModal);
