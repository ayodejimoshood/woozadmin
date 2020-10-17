import React from "react";
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
import { connect } from 'react-redux'
import { handleCreateMerchant } from "redux/actions/merchant";

class CreateMerchantModal extends React.Component {
  state = {
    CreateMerchantsModal: false,
    merchantName: '',
    vertical: '',
    attribute: '',
    isMakingRequest: false
  };
  toggleModal = (state) => {
    this.setState({
      [state]: !this.state[state],
    });
  };

  handleChange = (e) => {
    const {name, value} = e.target;

    this.setState({
      [name]: value
    })
  } 

  handleSubmit = (e) => {
    e.preventDefault();
    const {merchantName, vertical, attribute} = this.state;
    if (merchantName === '' || vertical === '' || attribute === '') {
      return;
    }
    this.setState(prevState => ({
      isMakingRequest: !prevState.isMakingRequest
    }))
    this.props.createMerchant({
      "name": merchantName,
      "vertical" :  vertical,
      "attributes": attribute
   }).then(res => {
      console.log(res)
      this.setState(prevState => ({
        isMakingRequest: !prevState.isMakingRequest
      }))
    })


  }


  render() {
    const {merchantName, vertical, attribute, isMakingRequest} = this.state;
    return (
      <>
        {/* Button trigger modal */}
        <Button
          color="primary"
          type="button"
          onClick={() => this.toggleModal("CreateMerchantsModal")}
        >
          Create Merchant(s)
        </Button>
        {/* Modal */}
        <Modal
          className="modal-dialog-centered"
          isOpen={this.state.CreateMerchantsModal}
          toggle={() => this.toggleModal("CreateMerchantsModal")}
        >
          <div className="modal-header">
            <h5 className="modal-title" id="CreateMerchantsModalLabel">
              Create Merchant
            </h5>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("CreateMerchantsModal")}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body">
            <Form onSubmit={this.handleSubmit}>
              <Row>
                <Col md="12">
                  <FormGroup>
                    <Input
                      id="exampleFormControlInput1"
                      placeholder="merchant name"
                      type="text"
                      name="merchantName"
                      value={merchantName}
                      onChange={e => this.handleChange(e)}
                    />
                  </FormGroup>
                </Col>
                <Col md="12">
                  <FormGroup>
                    <Input
                      id="exampleFormControlInput1"
                      placeholder="vertical"
                      type="text"
                      name="vertical"
                      value={vertical}
                      onChange={e => this.handleChange(e)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <FormGroup>
                    <Input
                      id="exampleFormControlInput1"
                      placeholder="attributes"
                      type="text"
                      name="attribute"
                      value={attribute}
                      onChange={e => this.handleChange(e)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <div className="modal-footer">
                <Button
                  color="secondary"
                  data-dismiss="modal"
                  type="button"
                  onClick={() => this.toggleModal("CreateMerchantsModal")}
                >
                  Close
              </Button>
              <Button 
                color="primary" 
                type="submit"
                disabled={merchantName === '' || vertical === '' || attribute === '' || isMakingRequest === true}
                >
                Create
              </Button>
              </div>
            </Form>
          </div>
        </Modal>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  createMerchant: (merchant) => dispatch(handleCreateMerchant(merchant))
})

export default connect(null, mapDispatchToProps)(CreateMerchantModal);
