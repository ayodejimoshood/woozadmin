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
import { handleAddHashtagEntry } from "redux/actions/socials";

class DeleteHashtagModal extends React.Component {
  state = {
    DeleteHashtagModal: false,
    hashtagEntry: '',
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
    const { hashtagEntry } = this.state;
    if (hashtagEntry === '') return;
    this.setState(prevState => ({
      isMakingRequest: !prevState.isMakingRequest
    }))
    this.props.addHashtagEntry({name: hashtagEntry}).then(res => {
      this.setState(prevState => ({
        isMakingRequest: !prevState.isMakingRequest
      }))
    })
  }

  render() {
    const { hashtagEntry, isMakingRequest } = this.state
    return (
      <>
        {/* Button trigger modal */}
        <Button
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
            Delete Category
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
              <Button style={{width: '100%'}} color="danger" type="button" onClick={() => this.toggleModal("DeleteHashtagModal")}> Yes </Button>
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
  addHashtagEntry: (hashtag) => dispatch(handleAddHashtagEntry(hashtag)) 
}) 


export default connect(null, mapDispatchToProps)(DeleteHashtagModal);
