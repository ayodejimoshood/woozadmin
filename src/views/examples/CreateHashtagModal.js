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
import { handleAddHashtag } from "redux/actions/socials";

class CreateHashtagModal extends React.Component {

  state = {
    CreateHashtagModal: false,
    hashtagName: '',
    isMakingRequest: ''
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
    const { hashtagName } = this.state;
    console.log(hashtagName)
    if (hashtagName === '') return;
    this.setState(prevState => ({
      isMakingRequest: !prevState.isMakingRequest
    }))
    this.props.addHashtag({name: hashtagName}).then(res => {
      this.setState(prevState => ({
        isMakingRequest: !prevState.isMakingRequest
      }))
    })
  }


  render() {
    const { hashtagName, isMakingRequest } = this.state
    return (
      <>
        {/* Button trigger modal */}
        <Button
          color="primary"
          type="button"
          onClick={() => this.toggleModal("CreateHashtagModal")}
        >
          Add Hashtag
        </Button>
        {/* Modal */}
        <Modal
          className="modal-dialog-centered"
          isOpen={this.state.CreateHashtagModal}
          toggle={() => this.toggleModal("CreateHashtagModal")}
        >
          <div className="modal-header">
            <h5 className="modal-title" id="CreateHashtagModalLabel">
              Add Hashtag
            </h5>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("CreateHashtagModal")}
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
                      placeholder="hashtag name"
                      type="text"
                      name="hashtagName"
                      value={hashtagName}
                      onChange={e => this.handleChange(e)}
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
                onClick={() => this.toggleModal("CreateHashtagModal")}
              >
                Close
            </Button>
              <Button 
                color="primary" 
                type="submit"
                disabled={hashtagName === '' || isMakingRequest === true}
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
  addHashtag: (hashtag) => dispatch(handleAddHashtag(hashtag)) 
}) 

export default connect(null, mapDispatchToProps)(CreateHashtagModal);
