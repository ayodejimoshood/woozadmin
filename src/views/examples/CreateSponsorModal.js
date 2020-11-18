import React from "react";
import { connect } from "react-redux";
// reactstrap components
import {
  Button,
  FormGroup,
  Form,
  Input,
  Modal,
  Row,
  Col,
  Label
} from "reactstrap";
import ImageUploader from 'react-images-upload';
import { handleCreateSponsor } from "redux/actions/sponsors";
import S3FileUpload from 'react-s3'
import { config } from '../../utils/react-s3-config'
import { toastr } from 'react-redux-toastr'
import { toastrOptions } from '../../utils/helpers'
import Loader from 'react-loader-spinner'

class CreateSponsorModal extends React.Component {
  state = {
    CreateSponsorModal: false,
    sponsorName: '',
    sponsorDesc: '',
    isMakingRequest: false,
    pictureLoading: 'unloaded',
    pictureKey: '',
    imageURL: ''
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

  handleSubmit = (e) => {
    e.preventDefault();
    const { sponsorName, sponsorDesc, imageURL } = this.state;
    if (sponsorName === '' || sponsorDesc === '') return;
    this.setState(prevState => ({
      isMakingRequest: !prevState.isMakingRequest
    }))
    this.props.createSponsor({name: sponsorName, description: sponsorDesc, imageURL}).then(res => {
      this.setState(prevState => ({
        isMakingRequest: !prevState.isMakingRequest
      }))
      if (res === 'success') {
        this.setState({
          sponsorName: '',
          sponsorDesc: '',
          imageURL: '',
          pictureLoading: 'unloaded',
          pictureKey: ''
        })
      }
    })
  }

  render() {
    const { sponsorName, sponsorDesc, isMakingRequest, pictureLoading, imageURL } = this.state
    return (
      <>
        {/* Button trigger modal */}
        <Button
          color="primary"
          type="button"
          onClick={() => this.toggleModal("CreateSponsorModal")}
        >
          Create
        </Button>
        {/* Modal */}
        <Modal
          className="modal-dialog-centered"
          isOpen={this.state.CreateSponsorModal}
          toggle={() => this.toggleModal("CreateSponsorModal")}
        >
          <div className="modal-header">
            <h4 className="modal-title" id="CreateSponsorModalLabel"> Create Sponsor </h4>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("CreateSponsorModal")}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <Form onSubmit={this.handleSubmit}>
          <div className="modal-body">
          
          <Row>

            <Col md="12">
              <FormGroup>
                <Label for="exampleSelect"> <h5>Sponsor Name</h5> </Label>
                <Input
                  id="exampleFormControlInput1"
                  placeholder="sponsor name"
                  type="text"
                  onChange={e => this.handleChange(e)}
                  name="sponsorName"
                  value={sponsorName}
                />
              </FormGroup>
            </Col>

            <Col md="12">
              <FormGroup>
                <Label for="exampleSelect"> <h5>Sponsor Description</h5> </Label>
                <Input
                  id="exampleFormControlInput1"
                  placeholder="sponsor description"
                  type="text"
                  onChange={e => this.handleChange(e)}
                  name="sponsorDesc"
                  value={sponsorDesc}
                />
              </FormGroup>
            </Col>
            
            <Col>
              <FormGroup>
                <Label for="exampleSelect"> <h5>Upload Sponsor Image</h5> </Label>
                {
                  pictureLoading === 'unloaded' ?
                  <ImageUploader
                    withIcon={false}
                    buttonText='Upload Sponsor image'
                    onChange={this.onDropPicture}
                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                    maxFileSize={5242880} 
                  /> :
                  pictureLoading === 'loading' ?
                    <div style={{ textAlign: 'center' }}>
                      <Loader
                        type="ThreeDots"
                        color="#000000"
                        height={50}
                        width={50}
                      />
                    </div>
                    : <div style={{ textAlign: 'center' }}>
                      Image uploaded successfully
                    </div>
                }
                
              </FormGroup>
            </Col>
          </Row>
       
          </div>
          <div className="modal-footer">
            <Button
              color="secondary"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("CreateSponsorModal")}
            >
              Close
            </Button>
            <Button 
              color="primary" 
              type="submit"
              disabled={sponsorName === '' || sponsorDesc === '' || isMakingRequest === true || !imageURL}
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
  createSponsor: (sponsor) => dispatch(handleCreateSponsor(sponsor)) 
}) 


export default connect(null, mapDispatchToProps)(CreateSponsorModal);
