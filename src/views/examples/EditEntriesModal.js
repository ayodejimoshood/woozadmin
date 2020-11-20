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
import ImageUploader from 'react-images-upload';
import { handleEditEntry } from "redux/actions/entries";

class EditEntriesModal extends React.Component {
  state = {
    EditEntriesModal: false,
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
    this.props.editEntry({challengeName: name}, this.props.ent._id).then(res => {
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
        <Button color="primary" type="button" style={{backgroundColor: '#033F7C'}} onClick={() => this.toggleModal("EditEntriesModal")}>
          Edit
        </Button>
        {/* Modal */}
        <Modal
          className="modal-dialog-centered"
          isOpen={this.state.EditEntriesModal}
          toggle={() => this.toggleModal("EditEntriesModal")}
        >
          <div className="modal-header">
            <h5 className="modal-title" id="EditEntriesModalLabel">
            Edit Entries
            </h5>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("EditEntriesModal")}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <Form onSubmit={this.handleSubmit}>
          <div className="modal-body">
          
          <Row>
          
            <Col md="12">
              <FormGroup>
                <Label for="exampleSelect"> <h5>Upload Image</h5> </Label>
                <ImageUploader
                  withIcon={false}
                  buttonText='Upload image'
                  onChange={this.onDrop}
                  // imgExtension={['.jpg', '.gif', '.png', '.gif']}
                  // maxFileSize={5242880}
                />
              </FormGroup>
            </Col>

            <Col md="12">
              <FormGroup>
                <Label for="exampleSelect"> <h5>Upload Video</h5> </Label>
                <ImageUploader withIcon={false} buttonText='Upload video' onChange={this.onDrop} />
              </FormGroup>
            </Col>

            <Col md="12">
              {/* <FormGroup>
              <Label for="exampleFormControlInput6"> <h5>Challenge Id</h5> </Label>
                <Input
                  id="exampleFormControlInput6"
                  placeholder="challenge id"
                  type="text"
                  onChange={e => this.handleChange(e)}
                  name="challengeId"
                  value={challengeId}
                />
              </FormGroup> */}
              <FormGroup>
                <Label for="exampleSelect"> <h5>Challenge ID</h5> </Label>
                {/* this dropdown is to display different challenge */}
                <Input
                  id="exampleFormControlInput1"
                  placeholder="challenge id"
                  type="text"
                  onChange={e => this.handleChange(e)}
                  name="categoryId"
                  value=""
                />
              </FormGroup>
            </Col>

            <Col md="12">
              <FormGroup>
                <Label for="exampleSelect"> <h5>Category ID</h5> </Label>
                {/* this dropdown is to display different categories */}
                <Input type="select" name="select" id="exampleSelect">
                  <option>Select Category</option>
                  <option>Comedy</option>
                  <option>Music</option>
                  <option>Drama</option>
                  <option>Politics</option>
                  <option>Art</option>
                </Input>
              </FormGroup>
              {/* <FormGroup>
              <Label for="exampleFormControlInput1"> <h5>Category Id</h5> </Label>
                <Input
                  id="exampleFormControlInput1"
                  placeholder="category id"
                  type="text"
                  onChange={e => this.handleChange(e)}
                  name="categoryId"
                  value=""
                />
              </FormGroup> */}
            </Col>
          </Row>
       
          </div>
          <div className="modal-footer">
            <Button
              color="secondary"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("EditEntriesModal")}
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
  editEntry: (name, id) => dispatch(handleEditEntry(name, id)) 
}) 


export default connect(null, mapDispatchToProps)(EditEntriesModal);
