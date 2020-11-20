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
import { handleDeleteChallenge } from "redux/actions/challenges";
import { handleAddHashtagEntry } from "redux/actions/socials";

class DeleteChallengesModal extends React.Component {
  state = {
    DeleteChallengesModal: false,
  };
  toggleModal = (state) => {
    this.setState({
      [state]: !this.state[state],
    });
  };

  handleDelete() {
    const { id, deleteChallenge } = this.props
    deleteChallenge(id)
    this.toggleModal("DeleteHashtagModal")
  }

  render() {
    return (
      <>
        {/* Button trigger modal */}
        <Button style={{backgroundColor: '#FF5757'}}
          color="danger"
          type="button"
          onClick={() => this.toggleModal("DeleteChallengesModal")}
        >
          Delete
        </Button>
        {/* Modal */}
        <Modal style={{width: '50%'}}
          classNamexx="modal-dialog-centered"
          isOpen={this.state.DeleteChallengesModal}
          toggle={() => this.toggleModal("DeleteChallengesModal")}
        >
          <div className="modal-header">
            <h5 className="modal-title" id="DeleteChallengesModalLabel">
            Delete Challenges
            </h5>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("DeleteChallengesModal")}
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
              <Button style={{width: '100%'}} color="success" type="button" onClick={() => this.toggleModal("DeleteChallengesModal")}> No </Button>
            </Col>
          </Row>
       
          </div>
        </Modal>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  deleteChallenge: (challengeID) => dispatch(handleDeleteChallenge(challengeID)) 
}) 


export default connect(null, mapDispatchToProps)(DeleteChallengesModal);
