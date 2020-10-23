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
import { handleAddCartegory } from "redux/actions/socials";

class CreateMerchantModals extends React.Component {
  state = {
    CreateCategoryModal: false,
    cartegoryName: '',
    isMakingRequest: ''
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
    const { cartegoryName } = this.state;
    if (cartegoryName === '') return;
    this.setState(prevState => ({
      isMakingRequest: !prevState.isMakingRequest
    }))
    this.props.addCartegory({name: cartegoryName}).then(res => {
      this.setState(prevState => ({
        isMakingRequest: !prevState.isMakingRequest
      }))
    })
  }

  render() {
    const { cartegoryName, isMakingRequest} = this.state
    return (
      <>
        {/* Button trigger modal */}
        <Button
          color="primary"
          type="button"
          onClick={() => this.toggleModal("CreateCategoryModal")}
        >
          Add Category
        </Button>
        {/* Modal */}
        <Modal
          className="modal-dialog-centered"
          isOpen={this.state.CreateCategoryModal}
          toggle={() => this.toggleModal("CreateCategoryModal")}
        >
          <div className="modal-header">
            <h5 className="modal-title" id="CreateCategoryModalLabel">
              Add Category
            </h5>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("CreateCategoryModal")}
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
                      placeholder="category name"
                      type="text"
                      name="cartegoryName"
                      value={cartegoryName}
                      onChange={e => this.handleChange(e)}
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
                onClick={() => this.toggleModal("CreateCategoryModal")}
              >
                Close
            </Button>
              <Button 
                color="primary" 
                type="submit"
                disabled={cartegoryName === '' || isMakingRequest === true}>
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
  addCartegory: (cartegory) => dispatch(handleAddCartegory(cartegory)) 
}) 

export default connect(null, mapDispatchToProps)(CreateMerchantModals);
