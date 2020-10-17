import React from "react";
import { connect } from 'react-redux'
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
import { handleCreateVertical } from "redux/actions/verticals";
import UploadVerticalIcons from './UploadVerticalIcons'


class CreateVerticalsModal extends React.Component {
  state = {
    CreateVerticalsForm: false,
    name: '',
    isMakingRequest: false
  };
  toggleModal = (state) => {
    this.setState({
      [state]: !this.state[state],
    });
  };

  handleChange = (e) => {
    const { name, value} = e.target;
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {name} = this.state;
    if (name === '') return;
    this.setState(prevState => ({
      isMakingRequest: !prevState.isMakingRequest
    }))
    this.props.createVertical({name}).then(res => {
      this.setState(prevState => ({
        isMakingRequest: !prevState.isMakingRequest
      }))
    })

  }


  render() {
    const {name, isMakingRequest} = this.state;
    return (
      <>
        {/* Button trigger modal */}
        <Button
          color="primary"
          type="button"
          onClick={() => this.toggleModal("CreateVerticalsForm")}
        >
          Create Vertical
        </Button>
        {/* Modal */}
        <Modal
          className="modal-dialog-centered"
          isOpen={this.state.CreateVerticalsForm}
          toggle={() => this.toggleModal("CreateVerticalsForm")}
        >
           <Form onSubmit={this.handleSubmit}>
          <div className="modal-header">
            <h5 className="modal-title" id="CreateVerticalsFormLabel">
              Create Vertical
            </h5>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("CreateVerticalsForm")}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body">
       
          <Row>
            <Col md="12">
              <FormGroup>
                <Input
                  id="exampleFormControlInput1"
                  placeholder="vertical name"
                  type="text"
                  name="name"
                  value={name}
                  onChange={e => this.handleChange(e)}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
          <Col md="12">
              <UploadVerticalIcons />
            </Col>
          </Row>

          </div>
          <div className="modal-footer">
            <Button
              color="secondary"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("CreateVerticalsForm")}
            >
              Close
            </Button>
            <Button 
              color="primary" 
              type="submit"
              aria-disabled="true"
              disabled={name === '' || isMakingRequest === true}>
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
  createVertical: (vertical) => dispatch(handleCreateVertical(vertical))
}) 

export default connect(null, mapDispatchToProps)(CreateVerticalsModal);
