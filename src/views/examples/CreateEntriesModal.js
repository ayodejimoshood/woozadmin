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
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Modal,
  Row,
  Col,
} from "reactstrap";
import ImageUploader from 'react-images-upload';
import { handleAddHashtagEntry } from "redux/actions/socials";
import { handleCreateEntry } from "redux/actions/entries";
// import UploadImage from '../examples/UploadImage';

class CreateEntriesModal extends React.Component {

  // upload image
  constructor(props) {
    // super(props);
    super(props);
    this.state = { pictures: [] };
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(pictureFiles, pictureDataURLs) {
    this.setState({
        pictures: pictureFiles
    });
  }
  // upload image

  state = {
    CreateEntriesModal: false,
    imageURL: '',
    mediaURL: '',
    challengeId: '',
    categoryId: '',
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
    const { imageURL, mediaURL, challengeId, categoryId } = this.state;
    if (!challengeId || !categoryId) return;
    this.setState(prevState => ({
      isMakingRequest: !prevState.isMakingRequest
    }))
    this.props.createEntry({imageURL, mediaURL, challengeId, categoryId}).then(res => {
      this.setState(prevState => ({
        isMakingRequest: !prevState.isMakingRequest
      }))
    })
  }

  render() {
    const { isMakingRequest, imageURL, mediaURL, challengeId, categoryId } = this.state
    return (
      <>
        {/* Button trigger modal */}
        <Button
          color="primary"
          type="button"
          onClick={() => this.toggleModal("CreateEntriesModal")}
        >
          Create
        </Button>
        {/* Modal */}
        <Modal
          className="modal-dialog-centered"
          isOpen={this.state.CreateEntriesModal}
          toggle={() => this.toggleModal("CreateEntriesModal")}
        >
          <div className="modal-header">
            <h4 className="modal-title" id="CreateEntriesModalLabel"> Create Entries </h4>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("CreateEntriesModal")}
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
              <FormGroup>
              <Label for="exampleFormControlInput6"> <h5>Challenge Id</h5> </Label>
                <Input
                  id="exampleFormControlInput6"
                  placeholder="challenge id"
                  type="text"
                  onChange={e => this.handleChange(e)}
                  name="challengeId"
                  value={challengeId}
                />
              </FormGroup>
              {/* <FormGroup>
                <Label for="exampleSelect"> <h5>Challenge ID</h5> </Label>
                <Input type="select" name="select" id="exampleSelect">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Input>
              </FormGroup> */}
            </Col>

            <Col md="12">
              <FormGroup>
              <Label for="exampleFormControlInput1"> <h5>Category Id</h5> </Label>
                <Input
                  id="exampleFormControlInput1"
                  placeholder="category id"
                  type="text"
                  onChange={e => this.handleChange(e)}
                  name="categoryId"
                  value={categoryId}
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
              onClick={() => this.toggleModal("CreateEntriesModal")}
            >
              Close
            </Button>
            <Button 
              color="primary" 
              type="submit"
              disabled={isMakingRequest === true || !challengeId || !categoryId}
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
  createEntry: (entry) => dispatch(handleCreateEntry(entry)) 
}) 


export default connect(null, mapDispatchToProps)(CreateEntriesModal);
