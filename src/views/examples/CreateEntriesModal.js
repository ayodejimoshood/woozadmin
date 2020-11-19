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
import S3FileUpload from 'react-s3';
import { config } from '../../utils/react-s3-config'
import { toastr } from 'react-redux-toastr'
import { toastrOptions } from '../../utils/helpers'
import Loader from 'react-loader-spinner'

class CreateEntriesModal extends React.Component {

  state = {
    pictureLoading: 'unloaded',
    pictureKey: '',
    CreateEntriesModal: false,
    imageURL: '',
    mediaURL: '',
    challengeId: '',
    categoryId: '',
    isMakingRequest: false,
    videoLoading: 'unloaded',
    videoKey: ''
  }

  componentDidMount() {
    this.props.getCategories()
  }

  onDropPicture = (pictureFiles, pictureDataURLs, name = "imageURL") => {
    this.setState(prev => ({
      pictureLoading: 'loading'
    }))
    S3FileUpload.uploadFile(pictureFiles[0], config)
      .then(data => {
        console.log(data)
        this.setState({
          [name]: data.location,
          pictureLoading: 'loaded',
          pictureKey: data.key
        }, () => console.log(this.state));
      })
      .catch(err => {
        this.setState({
          pictureLoading: 'unloaded'
        })
        console.log(err)
        toastr.warning('Error occured uploading the image', toastrOptions)
      })
  }

  onDropVideo = (e) => {
    const {target: {files}} = e
    const videoFile = files[0]
    this.setState(prev => ({
      videoLoading: 'loading'
    }))
    S3FileUpload.uploadFile(videoFile, config)
      .then(data => {
        console.log(data)
        this.setState({
          mediaURL: data.location,
          videoLoading: 'loaded',
          videoKey: data.key
        });
      })
      .catch(err => {
        this.setState({
          videoLoading: 'unloaded'
        })
        console.log(err)
        toastr.warning('Error occured uploading the video', toastrOptions)
      })
  }


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
    this.props.createEntry({ imageURL, mediaURL, challengeId, categoryId }).then(res => {
      this.setState(prevState => ({
        isMakingRequest: !prevState.isMakingRequest
      }))
      if (res === 'success') {
        this.setState({
          categoryId: '',
          challengeId: '',
          pictureLoading: 'unloaded',
          pictureKey: '',
          imageURL: '',
          mediaURL: '',
          videoLoading: 'unloaded',
          videoKey: ''
        })
      }
    })
  }

  render() {
    const { isMakingRequest, pictureLoading, challengeId, categoryId, videoLoading, imageURL, mediaURL } = this.state
    const { category } = this.props
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
                    {
                      pictureLoading === 'unloaded' ?
                        <ImageUploader
                          withIcon={false}
                          withPreview={true}
                          singleImage={true}

                          buttonText='Upload image'
                          onChange={this.onDropPicture}
                          name="imageURL"
                          imgExtension={['.jpg', '.gif', '.png', '.gif']}
                          maxFileSize={5242880}
                        />

                        : pictureLoading === 'loading' ?
                          <div style={{textAlign: 'center'}}>
                            <Loader
                              type="ThreeDots"
                              color="#000000"
                              height={50}
                              width={50}
                            />
                          </div>
                        : <div style={{textAlign: 'center'}}>
                            Image uploaded successfully
                          </div>

                    }
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
                    {
                      videoLoading === 'unloaded' ?
                        <div>
                          <input type="file" name="file" id="" accept="video/mp4,.mkv, video/x-m4v,video/*" onChange={this.onDropVideo} />
                        </div> :
                        videoLoading === 'loading' ?
                          <div style={{ textAlign: 'center' }}>
                            <Loader
                              type="ThreeDots"
                              color="#000000"
                              height={50}
                              width={50}
                            />
                          </div> :
                          <div style={{ textAlign: 'center' }}>
                            Video uploaded successfully
                          </div>

                    }

                    {/* <ImageUploader withIcon={false} buttonText='Upload video' onChange={this.onDropVideo} /> */}
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
                disabled={isMakingRequest === true || !categoryId || !mediaURL || !imageURL}
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

const mapStateToProps = ({ socials: { category } }) => ({
  category
})

const mapDispatchToProps = (dispatch) => ({
  createEntry: (entry) => dispatch(handleCreateEntry(entry)),
  getCategories: () => dispatch(handleGetCategories())
})


export default connect(mapStateToProps, mapDispatchToProps)(CreateEntriesModal);
