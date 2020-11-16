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
import { handleGetCategories } from "redux/actions/categories";
// import UploadImage from '../examples/UploadImage';

class CreateEntriesModal extends React.Component {

  state = { 
    CreateEntriesModal: false,
    imageURL: '',
    mediaURL: '',
    challengeId: '',
    categoryId: '',
    isMakingRequest: false };
  
  
    componentDidMount() {
    this.props.getCategories()
  }

  onDropPicture = (pictureFiles, pictureDataURLs, name = "imageURL") => {
    this.setState({
        [name]: pictureDataURLs[0]
    });
  }

  onDropVideo = (pictureFiles, pictureDataURLs, name = "mediaURL") => {
    this.setState({
        [name]: pictureDataURLs[0]
    });
  }
  // upload image
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
    console.log({ imageURL, mediaURL, challengeId, categoryId })
    if (!categoryId) return;
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
    const {category} = this.props
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
                  onChange={this.onDropPicture}
                  name="imageURL"
                  // imgExtension={['.jpg', '.gif', '.png', '.gif']}
                  // maxFileSize={5242880}
                />
                {/* <UploadImage/> */}
              </FormGroup>
              {/* <FormGroup>
                <Label for="exampleSelect">Upload Image</Label>
                <input type="file" onChange={this.handleChange}/> */}
                {/* <Input
                  id="exampleFormControlInput1"
                  placeholder="image url"
                  type="text"
                  onChange={e => this.handleChange(e)}
                  name="imageURL"
                  value={imageURL}
                /> */}
              {/* </FormGroup> */}
            </Col>

            <Col md="12">
              <FormGroup>
                <Label for="exampleSelect"> <h5>Upload Video</h5> </Label>
                <ImageUploader withIcon={false} buttonText='Upload video' onChange={this.onDropVideo} />
              </FormGroup>
              {/* <FormGroup>
                <Label for="exampleSelect">Upload Video</Label>
                <Input
                  id="exampleFormControlInput1"
                  placeholder="media url"
                  type="text"
                  onChange={e => this.handleChange(e)}
                  name="mediaURL"
                  value={mediaURL}
                />
              </FormGroup> */}
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
              <FormGroup>
                <Label for="exampleSelect"> <h5>Category</h5> </Label>
                <Input type="select" name="categoryId" id="exampleSelect" value={categoryId} onChange={e => this.handleChange(e)}>
                  <option value="">Select a category</option>
                {
                  category.map((cat) => (
                    <option key={cat._id} value={cat._id}>{cat.name[0].toUpperCase() + cat.name.slice(1)}</option>
                  ))
                }
                </Input>
              </FormGroup>
            </Col>

            {/* <Col md="12">
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
            </Col> */}
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
              disabled={isMakingRequest === true || !categoryId}
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

const mapStateToProps = ({socials: {category}}) => ({
  category
})

const mapDispatchToProps = (dispatch) => ({
  createEntry: (entry) => dispatch(handleCreateEntry(entry)),
  getCategories: () => dispatch(handleGetCategories()) 
}) 


export default connect(mapStateToProps, mapDispatchToProps)(CreateEntriesModal);
