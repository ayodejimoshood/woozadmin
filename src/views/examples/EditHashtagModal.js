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
import { handleEditHashtag } from "redux/actions/hashtag";
import { handleAddHashtagEntry } from "redux/actions/socials";

class EditHashtagModal extends React.Component {
  state = {
    EditHashtagModal: false,
    hashtagEntry: '',
    isMakingRequest: false
  };

  componentDidMount() {
    const { hash } = this.props;
    this.setState({
      hashtagEntry: hash.name
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
    const { hashtagEntry } = this.state;
    if (hashtagEntry === '') return;
    this.setState(prevState => ({
      isMakingRequest: !prevState.isMakingRequest
    }))
    this.props.editHashtag({name: hashtagEntry}, this.props.hash._id).then(res => {
      this.setState(prevState => ({
        isMakingRequest: !prevState.isMakingRequest
      }))
    })
  }

  render() {
    const { hashtagEntry, isMakingRequest } = this.state
    const { hash } = this.props
    return (
      <>
        {/* Button trigger modal */}
        <Button color="primary" type="button" onClick={() => this.toggleModal("EditHashtagModal")}>
          Edit
        </Button>
        {/* Modal */}
        <Modal
          className="modal-dialog-centered"
          isOpen={this.state.EditHashtagModal}
          toggle={() => this.toggleModal("EditHashtagModal")}
        >
          <div className="modal-header">
            <h5 className="modal-title" id="EditHashtagModalLabel">
            Edit Hashtag
            </h5>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("EditHashtagModal")}
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
                  placeholder="hashtag name"
                  type="text"
                  onChange={e => this.handleChange(e)}
                  name="hashtagEntry"
                  value={hashtagEntry}
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
              onClick={() => this.toggleModal("EditHashtagModal")}
            >
              Close
            </Button>
            <Button 
              color="primary" 
              type="submit"
              disabled={hashtagEntry === '' || isMakingRequest === true}
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
  editHashtag: (hashtag, id) => dispatch(handleEditHashtag(hashtag, id)) 
}) 


export default connect(null, mapDispatchToProps)(EditHashtagModal);
