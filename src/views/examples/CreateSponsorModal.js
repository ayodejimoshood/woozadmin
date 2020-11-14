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

class CreateSponsorModal extends React.Component {
  state = {
    CreateSponsorModal: false,
    sponsorName: '',
    sponsorDesc: '',
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
    const { sponsorName, sponsorDesc, hashTag } = this.state;
    if (sponsorName === '' || sponsorDesc === '') return;
    this.setState(prevState => ({
      isMakingRequest: !prevState.isMakingRequest
    }))
    this.props.createSponsor({name: sponsorName, description: sponsorDesc}).then(res => {
      this.setState(prevState => ({
        isMakingRequest: !prevState.isMakingRequest
      }))
      if (res === 'success') {
        this.setState({
          sponsorName: '',
          sponsorDesc: '',
        })
      }
    })
  }

  render() {
    const { sponsorName, sponsorDesc, isMakingRequest } = this.state
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
                <ImageUploader
                withIcon={false}
                buttonText='Upload Sponsor image'
                onChange={this.onDrop}
                // imgExtension={['.jpg', '.gif', '.png', '.gif']}
                // maxFileSize={5242880}
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
              onClick={() => this.toggleModal("CreateSponsorModal")}
            >
              Close
            </Button>
            <Button 
              color="primary" 
              type="submit"
              disabled={sponsorName === '' || sponsorDesc === '' || isMakingRequest === true}
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
