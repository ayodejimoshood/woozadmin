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
import { handleDeleteSponsor } from "redux/actions/sponsors";

class DeleteSponsorModal extends React.Component {
  state = {
    DeleteSponsorModal: false,
    hashtagEntry: '',
    isMakingRequest: false
  };
  toggleModal = (state) => {
    this.setState({
      [state]: !this.state[state],
    });
  };


  handleDelete() {
    const { id, deleteSponsor } = this.props
    deleteSponsor(id)
    this.toggleModal("DeleteHashtagModal")
  }

  render() {
    return (
      <>
        {/* Button trigger modal */}
        <Button
          color="danger"
          type="button"
          onClick={() => this.toggleModal("DeleteSponsorModal")}
        >
          Delete
        </Button>
        {/* Modal */}
        <Modal style={{width: '50%'}}
          classNamexx="modal-dialog-centered"
          isOpen={this.state.DeleteSponsorModal}
          toggle={() => this.toggleModal("DeleteSponsorModal")}
        >
          <div className="modal-header">
            <h5 className="modal-title" id="DeleteSponsorModalLabel">
            Delete Sponsor
            </h5>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("DeleteSponsorModal")}
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
              <Button style={{width: '100%'}} color="success" type="button" onClick={() => this.toggleModal("DeleteSponsorModal")}> No </Button>
            </Col>
          </Row>
       
          </div>
        </Modal>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  deleteSponsor: (id) => dispatch(handleDeleteSponsor(id)) 
}) 


export default connect(null, mapDispatchToProps)(DeleteSponsorModal);
