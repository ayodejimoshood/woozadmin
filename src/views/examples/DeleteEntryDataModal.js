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
import { handleDeleteEntryData } from "redux/actions/entryData";

class DeleteEntryDataModal extends React.Component {
  state = {
    DeleteEntryDataModal: false,
    isMakingRequest: false
  };
  toggleModal = (state) => {
    this.setState({
      [state]: !this.state[state],
    });
  };

  handleDelete() {
    const { ent: {isLike, _id}, deleteEntryData } = this.props
    deleteEntryData({entryId: _id, isLike})
    this.toggleModal("DeleteHashtagModal")
  }


  render() {
    return (
      <>
        {/* Button trigger modal */}
        <Button
          color="danger"
          type="button"
          onClick={() => this.toggleModal("DeleteEntryDataModal")}
        >
          Delete
        </Button>
        {/* Modal */}
        <Modal style={{width: '50%'}}
          className="modal-dialog-centered"
          isOpen={this.state.DeleteEntryDataModal}
          toggle={() => this.toggleModal("DeleteEntryDataModal")}
        >
          <div className="modal-header">
            <h5 className="modal-title" id="DeleteEntryDataModalLabel">
            Delete Entry Data
            </h5>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("DeleteEntryDataModal")}
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
              <Button style={{width: '100%'}} color="success" type="button" onClick={() => this.toggleModal("DeleteEntryDataModal")}> No </Button>
            </Col>
          </Row>
       
          </div>
        </Modal>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  deleteEntryData: (data) => dispatch(handleDeleteEntryData(data)) 
}) 


export default connect(null, mapDispatchToProps)(DeleteEntryDataModal);
