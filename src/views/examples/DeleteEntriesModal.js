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
import { handleDeleteEntry } from "redux/actions/entries";

class DeleteEntriesModal extends React.Component {
  state = {
    DeleteEntriesModal: false,
    isMakingRequest: false
  };
  toggleModal = (state) => {
    this.setState({
      [state]: !this.state[state],
    });
  };

  handleDelete() {
    const { id, deleteEntry } = this.props
    deleteEntry(id)
    this.toggleModal("DeleteHashtagModal")
  }


  render() {
    return (
      <>
        {/* Button trigger modal */}
        <Button style={{backgroundColor: '#FF5757'}}
          color="danger"
          type="button"
          onClick={() => this.toggleModal("DeleteEntriesModal")}
        >
          Delete
        </Button>
        {/* Modal */}
        <Modal style={{width: '50%'}}
          classNamexx="modal-dialog-centered"
          isOpen={this.state.DeleteEntriesModal}
          toggle={() => this.toggleModal("DeleteEntriesModal")}
        >
          <div className="modal-header">
            <h5 className="modal-title" id="DeleteEntriesModalLabel">
            Delete Entries
            </h5>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("DeleteEntriesModal")}
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
              <Button style={{width: '100%'}} color="success" type="button" onClick={() => this.toggleModal("DeleteEntriesModal")}> No </Button>
            </Col>
          </Row>
       
          </div>
        </Modal>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  deleteEntry: (hashtag) => dispatch(handleDeleteEntry(hashtag)) 
}) 


export default connect(null, mapDispatchToProps)(DeleteEntriesModal);
