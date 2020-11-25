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
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Modal,
  Row,
  Col,
} from "reactstrap";
import { handleAddHashtagEntry } from "redux/actions/socials";
import { handleEditSponsor } from "redux/actions/sponsors";

class EditSponsorModal extends React.Component {
  state = {
    EditSponsorModal: false,
    sponsorName: '',
    sponsorDesc: '',
    hashTag: '',
    isMakingRequest: false
  };

  componentDidMount() {
    const { sponsor } = this.props;
    this.setState({
      sponsorName: sponsor.name,
      sponsorDesc: sponsor.description
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
    const { sponsorName, sponsorDesc, hashTag } = this.state;
    if (sponsorName === '' || sponsorDesc === '' || hashTag === '') return;
    this.setState(prevState => ({
      isMakingRequest: !prevState.isMakingRequest
    }))
    this.props.editSponsor({name: sponsorName, description: sponsorDesc, hashtag: hashTag}, this.props.sponsor._id).then(res => {
      this.setState(prevState => ({
        isMakingRequest: !prevState.isMakingRequest
      }))
      if (res === 'success') {
        this.setState({
          sponsorName: '',
          sponsorDesc: '',
          hashTag: ''
        })
        this.toggleModal("EditSponsorModal")
      }
    })
  }

  render() {
    const { sponsorName, sponsorDesc, hashTag, isMakingRequest } = this.state
    return (
      <>
        {/* Button trigger modal */}
        <Button color="primary" type="button" style={{backgroundColor: '#033F7C'}} onClick={() => this.toggleModal("EditSponsorModal")}>
          Edit
        </Button>
        {/* Modal */}
        <Modal
          className="modal-dialog-centered"
          isOpen={this.state.EditSponsorModal}
          toggle={() => this.toggleModal("EditSponsorModal")}
        >
          <div className="modal-header">
            <h5 className="modal-title" id="EditSponsorModalLabel">
            Edit Sponsor
            </h5>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("EditSponsorModal")}
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
              onClick={() => this.toggleModal("EditSponsorModal")}
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
  editSponsor: (sponsor, id) => dispatch(handleEditSponsor(sponsor, id)) 
}) 


export default connect(null, mapDispatchToProps)(EditSponsorModal);
