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
import { handleEditcategory } from "redux/actions/categories";
import { handleGetHashtags } from "redux/actions/hashtag";

class EditCategoryModal extends React.Component {
  state = {
    EditCategoryModal: false,
    cartegoryName: '',
    categoryDesc: '',
    hashtag: '',
    isMakingRequest: false
  };

  componentDidMount() {
    const { cat, getHashtags } = this.props;
    getHashtags()
    this.setState({
      categoryDesc: cat.description,
      cartegoryName: cat.name,
      hashtag: cat.hashtagName
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
    const { cartegoryName, categoryDesc, hashtag } = this.state;
    if (cartegoryName === '', categoryDesc === '', hashtag === '') return;
    this.setState(prevState => ({
      isMakingRequest: !prevState.isMakingRequest
    }))
    this.props.editCategory({name: cartegoryName, description: categoryDesc, hashtag: hashtag}, this.props.cat._id).then(res => {
      this.setState(prevState => ({
        isMakingRequest: !prevState.isMakingRequest
      }))
      if (res === 'success') {
        this.setState({
          cartegoryName: '',
          categoryDesc: '',
          hashtag: ''
        })
        this.toggleModal("EditCategoryModal")
      }
    })
  }

  render() {
    const { cartegoryName, isMakingRequest, categoryDesc, hashtag} = this.state
    const { allHashtags } = this.props
    return (
      <>
        {/* Button trigger modal */}
        <Button color="primary" type="button" style={{backgroundColor: '#033F7C'}} onClick={() => this.toggleModal("EditCategoryModal")}>
          Edit
        </Button>
        {/* Modal */}
        <Modal
          className="modal-dialog-centered"
          isOpen={this.state.EditCategoryModal}
          toggle={() => this.toggleModal("EditCategoryModal")}
        >
          <div className="modal-header">
            <h5 className="modal-title" id="EditCategoryModalLabel">
            Edit Category
            </h5>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("EditCategoryModal")}
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
                  onChange={e => this.handleChange(e)}
                  name="categoryDesc"
                  value={categoryDesc}
                />
              </FormGroup>
            </Col>

            <Col md="12">
              <FormGroup>
                <Input
                  id="exampleFormControlInput1"
                  placeholder="category name"
                  type="text"
                  onChange={e => this.handleChange(e)}
                  name="cartegoryName"
                  value={cartegoryName}
                />
              </FormGroup>
            </Col>

            <Col md="12">
              <FormGroup>
                <Input
                type="select"
                name="hashtag"
                id="exampleSelect"
                value={hashtag}
                onChange={(e) => this.handleChange(e)}
              >
                <option value="">Select a hashtag</option>
                {allHashtags &&
                  allHashtags.map((hash) => (
                    <option key={hash._id} value={hash.name}>
                      {hash.name}
                    </option>
                  ))}
              </Input>
              </FormGroup>
            </Col>
          </Row>
       
          </div>
          <div className="modal-footer">
            <Button
              color="secondary"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("EditCategoryModal")}
            >
              Close
            </Button>
            <Button 
              color="primary" 
              type="submit"
              disabled={cartegoryName === '' || isMakingRequest === true, categoryDesc === '', hashtag === ''}
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

const mapStateToProps = ({ socials: { hashtag } }) => ({
  allHashtags: hashtag
});

const mapDispatchToProps = (dispatch) => ({
  editCategory: (category, id) => dispatch(handleEditcategory(category, id)),
  getHashtags: () => dispatch(handleGetHashtags()) 
}) 


export default connect(mapStateToProps, mapDispatchToProps)(EditCategoryModal);
