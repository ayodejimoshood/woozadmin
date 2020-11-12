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
} from "reactstrap";
import { handleAddHashtagEntry } from "redux/actions/socials";
import { handleCreateSponsor } from "redux/actions/sponsors";

class CreateSponsorModal extends React.Component {
  state = {
    CreateSponsorModal: false,
    sponsorName: '',
    sponsorDesc: '',
    hashTag: '',
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
    if (sponsorName === '' || sponsorDesc === '' || hashTag === '') return;
    this.setState(prevState => ({
      isMakingRequest: !prevState.isMakingRequest
    }))
    this.props.createSponsor({name: sponsorName, description: sponsorDesc}).then(res => {
      this.setState(prevState => ({
        isMakingRequest: !prevState.isMakingRequest
      }))
    })
  }

  render() {
    const { sponsorName, sponsorDesc, hashTag, isMakingRequest } = this.state
    return (
      <>
        {/* Button trigger modal */}
        <Button
          color="primary"
          type="button"
          onClick={() => this.toggleModal("CreateSponsorModal")}
        >
          Create Sponsor
        </Button>
        {/* Modal */}
        <Modal
          className="modal-dialog-centered"
          isOpen={this.state.CreateSponsorModal}
          toggle={() => this.toggleModal("CreateSponsorModal")}
        >
          <div className="modal-header">
            <h5 className="modal-title" id="CreateSponsorModalLabel">
            Create Sponsor
            </h5>
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

            <Col md="12">
              <FormGroup>
                <Input
                  id="exampleFormControlInput1"
                  placeholder="#hashtag"
                  type="text"
                  onChange={e => this.handleChange(e)}
                  name="hashTag"
                  value={hashTag}
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
              disabled={sponsorName === '' || sponsorDesc === '' || hashTag === '' || isMakingRequest === true}
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
