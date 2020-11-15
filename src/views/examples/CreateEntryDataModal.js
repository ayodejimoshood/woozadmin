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
import { handleCreateEntryData } from "redux/actions/entryData";

class CreateEntryDataModal extends React.Component {
  state = {
    CreateEntryDataModal: false,
    entryId: '',
    isLike: undefined,
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
    const { entryId, isLike } = this.state;
    console.log(entryId, isLike)
    if (entryId.length < 1 || typeof(isLike) !== 'string') {
      return
    } 
    this.setState(prevState => ({
      isMakingRequest: !prevState.isMakingRequest
    }))
    this.props.createEntryData({entryId, isLike}).then(res => {
      this.setState(prevState => ({
        isMakingRequest: !prevState.isMakingRequest
      }))
      if (res === 'success') {
        this.setState({
          entryId: '',
          isLike: undefined
        })
      }
    })
  }

  render() {
    const { isMakingRequest, entryId, isLike } = this.state
    return (
      <>
        {/* Button trigger modal */}
        <Button
          color="primary"
          type="button"
          onClick={() => this.toggleModal("CreateEntryDataModal")}
        >
          Create
        </Button>
        {/* Modal */}
        <Modal
          className="modal-dialog-centered"
          isOpen={this.state.CreateEntryDataModal}
          toggle={() => this.toggleModal("CreateEntryDataModal")}
        >
          <div className="modal-header">
            <h5 className="modal-title" id="CreateEntryDataModalLabel">
            Create Entry Data
            </h5>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("CreateEntryDataModal")}
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
                  placeholder="entry id"
                  type="text"
                  onChange={e => this.handleChange(e)}
                  name="entryId"
                  value={entryId}
                />
              </FormGroup>
            </Col>
            <Col md="3" className="custom-control custom-radio mb-3 ml-3">
              {/* <FormGroup> */}
                <input className="custom-control-input" id="customRadio5" name="isLike" type="radio" value="true"
                checked={isLike === "true"}
                onChange={(e) => this.handleChange(e)} />
                <label className="custom-control-label" htmlFor="customRadio5"> True </label>
              {/* </FormGroup> */}
            </Col>
            <Col md="3" className="custom-control custom-radio mb-3">
              {/* <FormGroup> */}
                <input className="custom-control-input" id="customRadio6" name="isLike" type="radio" value="false"
                checked={isLike === "false"}
                onChange={(e) => this.handleChange(e)} />
                <label className="custom-control-label" htmlFor="customRadio6"> False </label>
              {/* </FormGroup> */}
            </Col>
          </Row>
          </div>
          <div className="modal-footer">
            <Button
              color="secondary"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("CreateEntryDataModal")}
            >
              Close
            </Button>
            <Button 
              color="primary" 
              type="submit"
              disabled={!entryId || !isLike || isMakingRequest === true}
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
  createEntryData: (entryData) => dispatch(handleCreateEntryData(entryData)) 
}) 


export default connect(null, mapDispatchToProps)(CreateEntryDataModal);
