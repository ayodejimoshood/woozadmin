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
  Label,
  Modal,
  Row,
  Col,
} from "reactstrap";
import { handleCreateHashtag } from "redux/actions/hashtag";

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
    if (hashtagName === '') return;
    this.setState(prevState => ({
      isMakingRequest: !prevState.isMakingRequest
    }))
    this.props.createHashtag({name: hashtagName}).then(res => {
      this.setState(prevState => ({
        isMakingRequest: !prevState.isMakingRequest
      }))
      if (res === 'success') {
        this.setState({
          hashtagName: ''
        })
      }
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
          Create
        </Button>
        {/* Modal */}
        <Modal
          className="modal-dialog-centered"
          isOpen={this.state.CreateHashtagModal}
          toggle={() => this.toggleModal("CreateHashtagModal")}
        >
          <div className="modal-header">
            <h4 className="modal-title" id="CreateHashtagModalLabel"> Add Hashtag </h4>
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
                    <Label for="exampleSelect"> <h5>Hashtag Name</h5> </Label>
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
  createHashtag: (hashtag) => dispatch(handleCreateHashtag(hashtag))
}) 

export default connect(null, mapDispatchToProps)(CreateHashtagModal);
