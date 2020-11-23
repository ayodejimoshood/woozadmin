import React from "react";
import { connect } from "react-redux";
import S3FileUpload from 'react-s3'
import { config } from '../../utils/react-s3-config'
import { toastr } from 'react-redux-toastr'
import { toastrOptions } from '../../utils/helpers'
import Loader from 'react-loader-spinner'

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
import { handleAddHashtagEntry } from "redux/actions/socials";
import { handleCreateChallenge } from "redux/actions/challenges";
import { handleGetCategories } from "redux/actions/categories";
import { handleGetSponsors } from "redux/actions/sponsors";

class CreateChallengesModal extends React.Component {
  state = {
    CreateChallengesModal: false,
    id: '',
    name: '',
    imageURL: '',
    hashtag: '',
    isMakingRequest: false,
    pictureLoading: 'unloaded'
  };

  componentDidMount() {
    this.props.getCategories()
    this.props.getSponsors()
  }

  componentWillUnmount() {
    this.setState({
      id: '',
      name: '',
      imageURL: '',
      hashtag: '',
      sponsor: '',
      isMakingRequest: false,
      pictureLoading: 'unloaded'
    })
  }

  toggleModal = (state) => {
    this.setState({
      [state]: !this.state[state],
    });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    console.log(value)
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
    const { id, name, hashtag, imageURL, sponsor } = this.state;
    if (id === '' || name === '' || hashtag === '') return;
    this.setState(prevState => ({
      isMakingRequest: !prevState.isMakingRequest
    }))
    this.props.createChallenge({ name, categoryId: id, hashtag, imageURL, sponsorId: sponsor }).then(res => {
      this.setState(prevState => ({
        isMakingRequest: !prevState.isMakingRequest
      }))
      if (res === "success") {
        this.setState({
          id: '',
          name: '',
          hashtag: '',
          imageURL: '',
          sponsor: '',
          pictureLoading: 'unloaded'
        })
      }
    })
  }

  render() {
    const { name, id, imageURL, hashtag, isMakingRequest, pictureLoading, sponsor } = this.state
    const { category, sponsors } = this.props
    return (
      <>
        {/* Button trigger modal */}
        <Button style={{ backgroundColor: '#033F7C' }}
          color="primary"
          type="button"
          onClick={() => this.toggleModal("CreateChallengesModal")}
        >
          Create
        </Button>
        {/* Modal */}
        <Modal
          className="modal-dialog-centered"
          isOpen={this.state.CreateChallengesModal}
          toggle={() => this.toggleModal("CreateChallengesModal")}
        >
          <div className="modal-header">
            <h4 className="modal-title" id="CreateChallengesModalLabel"> Create Challenges </h4>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("CreateChallengesModal")}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <Form onSubmit={this.handleSubmit}>
            <div className="modal-body">

              <Row>
                <Col md="12">


                  <FormGroup>
                    <Label for="exampleSelect"> <h5>Category ID</h5> </Label>
                    <Input type="select" name="id" id="exampleSelect" value={id} onChange={e => this.handleChange(e)}>
                      <option value="">Select a category</option>
                      {
                        category.map((cat) => (
                          <option key={cat._id} value={cat._id}>{cat.name[0].toUpperCase() + cat.name.slice(1)}</option>
                        ))
                      }
                    </Input>
                  </FormGroup>
                </Col>
                <Col md="12">
                  <FormGroup>
                    <Label for="exampleSelect"> <h5>Sponsor ID</h5> </Label>
                    <Input type="select" name="sponsor" id="exampleSelect" value={sponsor} onChange={e => this.handleChange(e)}>
                      <option value="">Select a sponsor</option>
                      {
                        sponsors.map((spon) => (
                          <option key={spon._id} value={spon._id}>{spon.name}</option>
                        ))
                      }
                    </Input>
                  </FormGroup>
                </Col>
                <Col md="12">
                  <FormGroup>
                    <Label for="exampleSelect"><h5>Challenge Name</h5></Label>
                    <Input
                      id="exampleFormControlInput1"
                      placeholder="Challenge Name"
                      type="text"
                      onChange={e => this.handleChange(e)}
                      name="name"
                      value={name}
                    />
                  </FormGroup>
                </Col>

                <Col md="12">
                  <FormGroup>
                    <Label for="exampleSelect"><h5>Challenge Hashtag</h5></Label>
                    <Input
                      id="exampleFormControlInput1"
                      placeholder="Hashtag"
                      type="text"
                      onChange={e => this.handleChange(e)}
                      name="hashtag"
                      value={hashtag}
                    />
                  </FormGroup>
                </Col>

                <Col md="12">
                  <FormGroup>
                    <Label for="exampleSelect"><h5>Upload Challenge Image</h5></Label>
                    {
                      pictureLoading === 'unloaded' ?
                        <ImageUploader
                          withIcon={false}
                          buttonText='Upload Challenge image'
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
                onClick={() => this.toggleModal("CreateChallengesModal")}
              >
                Close
            </Button>
              <Button style={{ backgroundColor: '#033F7C' }}
                color="primary"
                type="submit"
                disabled={id === '' || name === '' || hashtag === '' || isMakingRequest === true || !imageURL}
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

const mapStateToProps = ({ socials: { category, sponsors } }) => ({
  category,
  sponsors
})

const mapDispatchToProps = (dispatch) => ({
  createChallenge: (challenge) => dispatch(handleCreateChallenge(challenge)),
  getCategories: () => dispatch(handleGetCategories()),
  getSponsors: () => dispatch(handleGetSponsors())
})


export default connect(mapStateToProps, mapDispatchToProps)(CreateChallengesModal);
