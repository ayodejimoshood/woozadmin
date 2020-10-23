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
import { convertDateToNumber } from "utils/helpers";
import { handleCreateInsurance } from "redux/actions/insurance";

class CreateInsuranceModal extends React.Component {
  state = {
    CreateMerchantsModal: false,
    merchantName: '',
    vertical: '',
    attribute: '',
    isMakingRequest: false,
    patnerCode: '',
    productCode: '',
    firstName: '',
    lastName: '',
    gender: '',
    dob: '',
    phone: '',
    address: '',
    policyStartDate: '',
    policyEndDate: '',
    sumAssured: '',
    premium: ''
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

  handleDate = (event, location) => {
    if (typeof(event) !== 'object') return false;

    const date = event.toDate().toString()
    const dateArr = date.split(" ")
    let day = dateArr[2], year = dateArr[3], month = convertDateToNumber(dateArr[1])
    const formattedDate = `${month}/${day}/${year}`
    if (location === 'dob') {
      this.setState({
        [location]: formattedDate
      })
      return
    }
    const formattedDateforPolicy = `${year}-${month}-${day} 23:00:00`
    this.setState({
      [location]: formattedDateforPolicy
    })
    return
  }

  handleDateChangeRaw = (e) => {
    e.preventDefault();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      patnerCode,
      productCode,
      firstName,
      lastName,
      gender,
      dob,
      phone,
      address,
      policyStartDate,
      policyEndDate,
      sumAssured,
      premium
    } = this.state;
    let genderNum

      if (gender.startsWith('M') || gender.startsWith('m')) {
        genderNum = 1
      } else if (gender.startsWith('F') || gender.startsWith('f')) {
        genderNum = 0
      }

    if (patnerCode === '' || productCode === '' || firstName === '' || lastName === '' || dob === '' || phone === '' || address === '' ||
      policyStartDate === '' || policyEndDate === '' || gender === '' || sumAssured === '' || premium === '') {
        alert("Please fill all fields")
        return;
      }
    
    console.log(this.state)
    
    this.setState(prevState => ({
      isMakingRequest: !prevState.isMakingRequest
    }))

    this.props.createInsurance({
      PatnerCode: patnerCode,
      ProductCode: productCode,
      Firstname: firstName,
      Lastname: lastName,
      DateOfBirth: dob,
      Gender: genderNum,
      Phonenumber: phone,
      Address: address,
      PolicyStartDate: policyStartDate,
      PolicyEndDate: policyEndDate,
      SumAssured: sumAssured,
      Premium: premium
    }).then(res => {
      this.setState(prevState => ({
        isMakingRequest: !prevState.isMakingRequest
      }))
    })
  }


  render() {
    const {
      patnerCode,
      productCode,
      firstName,
      lastName,
      gender,
      dob,
      phone,
      address,
      policyStartDate,
      policyEndDate,
      sumAssured,
      premium,
      isMakingRequest
    } = this.state;
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
                      type="number"
                      name="patnerCode"
                      value={patnerCode}
                      onChange={e => this.handleChange(e)}
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Input
                      id="exampleFormControlInput1"
                      placeholder="product code"
                      type="number"
                      name="productCode"
                      value={productCode}
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
                      name="firstName"
                      value={firstName}
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
                      name="lastName"
                      value={lastName}
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
                          placeholder: "Date Of Birth",
                          name: 'dob',
                          
                        }}
                        onChange={(e) => this.handleDate(e, 'dob')}
                        required
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
                      name="gender"
                      value={gender}
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
                      name="phone"
                      value={phone}
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
                      name="address"
                      value={address}
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
                  onChange={e => this.handleDate(e, 'policyStartDate')}
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
                  onChange={e => this.handleDate(e, 'policyEndDate')}
                />
              </InputGroup>
            </FormGroup>
          </Col>

          <Col md="6">
                  <FormGroup>
                    <Input
                      id="exampleFormControlInput1"
                      placeholder="sum assured"
                      type="number"
                      name="sumAssured"
                      value={sumAssured}
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
                      name="premium"
                      value={premium}
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
                disabled={isMakingRequest === true}
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
  createInsurance: (insurance) => dispatch(handleCreateInsurance(insurance))
})

export default connect(null, mapDispatchToProps)(CreateInsuranceModal);
