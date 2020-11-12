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

class CreateMerchantModals extends React.Component {
  state = {
    CreateCategoryModal: false,
    cartegoryName: '',
    categoryDesc: '',
    hashtag: '',
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
    const { cartegoryName, categoryDesc, hashtag } = this.state;
    if (cartegoryName === '', categoryDesc === '', hashtag === '') return;
    this.setState(prevState => ({
      isMakingRequest: !prevState.isMakingRequest
    }))
    this.props.createCategory({name: cartegoryName, description: categoryDesc, hashtag}).then(res => {
      this.setState(prevState => ({
        isMakingRequest: !prevState.isMakingRequest
      }))
    })
  }

  render() {
    const { cartegoryName, isMakingRequest, categoryDesc, hashtag} = this.state
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
                      placeholder="category description"
                      type="text"
                      name="cartegoryName"
                      value={cartegoryName}
                      onChange={e => this.handleChange(e)}
                    />
                  </FormGroup>
                </Col>
                <Col md="12">
                  <FormGroup>
                    <Input
                      id="exampleFormControlInput1"
                      placeholder="category name"
                      type="text"
                      name="categoryDesc"
                      value={categoryDesc}
                      onChange={e => this.handleChange(e)}
                    />
                  </FormGroup>
                </Col>
                <Col md="12">
                  <FormGroup>
                    <Input
                      id="exampleFormControlInput1"
                      placeholder="#hashtag"
                      type="text"
                      name="hashtag"
                      value={hashtag}
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
                disabled={cartegoryName === '' || isMakingRequest === true, categoryDesc === '', hashtag === ''}>
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
  createCategory: (category) => dispatch(handleCreateCategory(category))
}) 

export default connect(null, mapDispatchToProps)(CreateMerchantModals);
