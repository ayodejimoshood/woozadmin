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
import ReactDatetime from "react-datetime";

class CreateInsuranceModal extends React.Component {
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
          Create Insurance
        </Button>
        {/* Modal */}
        <Modal
          className="modal-dialog-centered"
          isOpen={this.state.CreateMerchantsModal}
          toggle={() => this.toggleModal("CreateMerchantsModal")}
        >
          <div className="modal-header">
            <h5 className="modal-title" id="CreateMerchantsModalLabel">
              Create Insurance
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
                <Col md="6">
                  <FormGroup>
                    <Input
                      id="exampleFormControlInput1"
                      placeholder="partner code"
                      type="text"
                      name="merchantName"
                      value={merchantName}
                      onChange={e => this.handleChange(e)}
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Input
                      id="exampleFormControlInput1"
                      placeholder="product code"
                      type="text"
                      name="vertical"
                      value={vertical}
                      onChange={e => this.handleChange(e)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <Input
                      id="exampleFormControlInput1"
                      placeholder="first name"
                      type="text"
                      name="attribute"
                      value={attribute}
                      onChange={e => this.handleChange(e)}
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Input
                      id="exampleFormControlInput1"
                      placeholder="last name"
                      type="text"
                      name="attribute"
                      value={attribute}
                      onChange={e => this.handleChange(e)}
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-calendar-grid-58" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <ReactDatetime
                        inputProps={{
                          placeholder: "Date Of Birth"
                        }}
                        timeFormat={false}
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Input
                      id="exampleFormControlInput1"
                      placeholder="gender"
                      type="text"
                      name="attribute"
                      value={attribute}
                      onChange={e => this.handleChange(e)}
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Input
                      id="exampleFormControlInput1"
                      placeholder="phone number"
                      type="phone"
                      name="attribute"
                      value={attribute}
                      onChange={e => this.handleChange(e)}
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Input
                      id="exampleFormControlInput1"
                      placeholder="Address"
                      type="text"
                      name="attribute"
                      value={attribute}
                      onChange={e => this.handleChange(e)}
                    />
                  </FormGroup>
                </Col>
                
          <Col xs={6}>
            <FormGroup>
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-calendar-grid-58" />
                  </InputGroupText>
                </InputGroupAddon>
                <ReactDatetime
                  inputProps={{
                    placeholder: "Policy Start Date"
                  }}
                  timeFormat={false}
                  renderDay={(props, currentDate, selectedDate) => {
                    let classes = props.className;
                    if (
                      this.state.startDate &&
                      this.state.endDate &&
                      this.state.startDate._d + "" === currentDate._d + ""
                    ) {
                      classes += " start-date";
                    } else if (
                      this.state.startDate &&
                      this.state.endDate &&
                      new Date(this.state.startDate._d + "") <
                        new Date(currentDate._d + "") &&
                      new Date(this.state.endDate._d + "") >
                        new Date(currentDate._d + "")
                    ) {
                      classes += " middle-date";
                    } else if (
                      this.state.endDate &&
                      this.state.endDate._d + "" === currentDate._d + ""
                    ) {
                      classes += " end-date";
                    }
                    return (
                      <td {...props} className={classes}>
                        {currentDate.date()}
                      </td>
                    );
                  }}
                  onChange={e => this.setState({ startDate: e })}
                />
              </InputGroup>
            </FormGroup>
          </Col>
          <Col xs={6}>
            <FormGroup>
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-calendar-grid-58" />
                  </InputGroupText>
                </InputGroupAddon>
                <ReactDatetime
                  inputProps={{
                    placeholder: "Policy End Date"
                  }}
                  timeFormat={false}
                  renderDay={(props, currentDate, selectedDate) => {
                    let classes = props.className;
                    if (
                      this.state.startDate &&
                      this.state.endDate &&
                      this.state.startDate._d + "" === currentDate._d + ""
                    ) {
                      classes += " start-date";
                    } else if (
                      this.state.startDate &&
                      this.state.endDate &&
                      new Date(this.state.startDate._d + "") <
                        new Date(currentDate._d + "") &&
                      new Date(this.state.endDate._d + "") >
                        new Date(currentDate._d + "")
                    ) {
                      classes += " middle-date";
                    } else if (
                      this.state.endDate &&
                      this.state.endDate._d + "" === currentDate._d + ""
                    ) {
                      classes += " end-date";
                    }
                    return (
                      <td {...props} className={classes}>
                        {currentDate.date()}
                      </td>
                    );
                  }}
                  onChange={e => this.setState({ endDate: e })}
                />
              </InputGroup>
            </FormGroup>
          </Col>

          <Col md="6">
                  <FormGroup>
                    <Input
                      id="exampleFormControlInput1"
                      placeholder="sum assured"
                      type="phone"
                      name="attribute"
                      value={attribute}
                      onChange={e => this.handleChange(e)}
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Input
                      id="exampleFormControlInput1"
                      placeholder="Premium"
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

export default connect(null, mapDispatchToProps)(CreateInsuranceModal);
