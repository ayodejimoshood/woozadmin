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

class CreateEntryCommentsModal extends React.Component {
  state = {
    CreateEntryCommentsModal: false,
    comment: '',
    entryId: '',
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
    const { comment, entryId } = this.state;
    if (!comment || !entryId) return;
    this.setState(prevState => ({
      isMakingRequest: !prevState.isMakingRequest
    }))
    this.props.addHashtagEntry({comment, entryId}).then(res => {
      this.setState(prevState => ({
        isMakingRequest: !prevState.isMakingRequest
      }))
    })
  }

  render() {
    const { isMakingRequest, comment, entryId } = this.state
    return (
      <>
        {/* Button trigger modal */}
        <Button
          color="primary"
          type="button"
          onClick={() => this.toggleModal("CreateEntryCommentsModal")}
        >
          CreateEntryComments
        </Button>
        {/* Modal */}
        <Modal
          className="modal-dialog-centered"
          isOpen={this.state.CreateEntryCommentsModal}
          toggle={() => this.toggleModal("CreateEntryCommentsModal")}
        >
          <div className="modal-header">
            <h5 className="modal-title" id="CreateEntryCommentsModalLabel">
            Create Entry Comments
            </h5>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("CreateEntryCommentsModal")}
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
                  placeholder="comment"
                  type="text"
                  onChange={e => this.handleChange(e)}
                  name="comment"
                  value={comment}
                />
              </FormGroup>
            </Col>

            <Col md="12">
              <FormGroup>
                <Input
                  id="exampleFormControlInput1"
                  placeholder="entry id"
                  type="text"
                  onChange={e => this.handleChange(e)}
                  name="entryId"
                  value={entryId}
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
              onClick={() => this.toggleModal("CreateEntryCommentsModal")}
            >
              Close
            </Button>
            <Button 
              color="primary" 
              type="submit"
              disabled={!comment || !entryId || isMakingRequest === true}
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
  addHashtagEntry: (hashtag) => dispatch(handleAddHashtagEntry(hashtag)) 
}) 


export default connect(null, mapDispatchToProps)(CreateEntryCommentsModal);
