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
import { handleEditChallenge } from "redux/actions/challenges";

class EditChallengesModal extends React.Component {
  state = {
    EditChallengesModal: false,
    name: '',
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

  handleSubmit = (e) => {
    e.preventDefault();
    const { name } = this.state;
    if (name === '') return;
    this.setState(prevState => ({
      isMakingRequest: !prevState.isMakingRequest
    }))
    this.props.editChallenge({name}, this.props.chal._id).then(res => {
      this.setState(prevState => ({
        isMakingRequest: !prevState.isMakingRequest
      }))
      if (res === "success") {
        this.setState({
          name: '',
        })
      }
    })
  }

  render() {
    const { name, isMakingRequest } = this.state
    return (
      <>
        {/* Button trigger modal */}
        <Button color="primary" type="button" style={{backgroundColor: '#033F7C'}} onClick={() => this.toggleModal("EditChallengesModal")}>
          Edit
        </Button>
        {/* Modal */}
        <Modal
          className="modal-dialog-centered"
          isOpen={this.state.EditChallengesModal}
          toggle={() => this.toggleModal("EditChallengesModal")}
        >
          <div className="modal-header">
            <h5 className="modal-title" id="EditChallengesModalLabel">
            Edit Challenges
            </h5>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("EditChallengesModal")}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <Form onSubmit={this.handleSubmit}>
          <div className="modal-body">
          
          <Row>
            <Col md="12">
              <FormGroup>
                <Input
                  id="exampleFormControlInput1"
                  placeholder="challenge name"
                  type="text"
                  onChange={e => this.handleChange(e)}
                  name="name"
                  value={name}
                />
              </FormGroup>
            </Col>

            
          </Row>
       
          </div>
          <div className="modal-footer">
            <Button
              color="secondary"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("EditChallengesModal")}
            >
              Close
            </Button>
            <Button 
              color="primary" 
              type="submit"
              disabled={name === '' || isMakingRequest === true}
            >
              Create
            </Button>
          </div>
          </Form>
        </Modal>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  editChallenge: (challenge, id) => dispatch(handleEditChallenge(challenge, id)) 
}) 


export default connect(null, mapDispatchToProps)(EditChallengesModal);
