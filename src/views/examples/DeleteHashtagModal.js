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
import { handleDeleteHashtag } from "redux/actions/hashtag";

class DeleteHashtagModal extends React.Component {
  state = {
    DeleteHashtagModal: false,
  };
  toggleModal = (state) => {
    this.setState({
      [state]: !this.state[state],
    });
  };

  handleDelete() {
    const { id, deleteHashtag } = this.props
    deleteHashtag(id)
    this.toggleModal("DeleteHashtagModal")
  }


  render() {
    return (
      <>
        {/* Button trigger modal */}
        <Button style={{backgroundColor: '#FF5757'}}
          color="danger"
          type="button"
          onClick={() => this.toggleModal("DeleteHashtagModal")}
        >
          Delete
        </Button>
        {/* Modal */}
        <Modal style={{width: '50%'}}
          classNamexx="modal-dialog-centered"
          isOpen={this.state.DeleteHashtagModal}
          toggle={() => this.toggleModal("DeleteHashtagModal")}
        >
          <div className="modal-header">
            <h5 className="modal-title" id="DeleteHashtagModalLabel">
            Delete hashtag
            </h5>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("DeleteHashtagModal")}
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
              <Button style={{width: '100%'}} color="success" type="button" onClick={() => this.toggleModal("DeleteHashtagModal")}> No </Button>
            </Col>
          </Row>
       
          </div>
        </Modal>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  deleteHashtag: (hashtag) => dispatch(handleDeleteHashtag(hashtag)) 
}) 


export default connect(null, mapDispatchToProps)(DeleteHashtagModal);
