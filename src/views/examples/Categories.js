import React from "react";
import './style.css'
import ReactPaginate from 'react-paginate';
import Loader from 'react-loader-spinner'
import { calculatePagination } from "utils/helpers";

// reactstrap components
import {
  Badge,
  Card,
  Button,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { Link } from "react-router-dom";
import DeleteCategoryModal from "./DeleteCategoryModal";
import EditCategoryModal from "./EditCategoryModal";
import { connect } from "react-redux";
import { handleGetCategories } from "redux/actions/categories";
// import { handleGetCategories } from "redux/actions/Categories";
// import { connect } from "react-redux";

class Categories extends React.Component {
  state = {
    loading: true,
    pageCount: 1,
    perPage: 10,
    paginationNumber: 1
  }


  componentDidMount() {
    this.props.getCategories(this.state.paginationNumber).then(res => {
      if (res.message === 'success') {
        const pageCount = calculatePagination(this.state.perPage, res.total)
        this.setState({
          pageCount: pageCount
        })
      }
      this.setState({
        loading: false
      })
    })
  }

  handlePageClick = (data) => {
    let selected = data.selected + 1;
    this.setState({ paginationNumber: selected, loading: true }, () => {
      this.props.getCategories(this.state.paginationNumber).then(res => {
        if (res.message === 'success') {
          const pageCount = calculatePagination(this.state.perPage, res.total)
          this.setState({
            pageCount: pageCount
          })
        }
        this.setState({
          loading: false
        })
      })
    });
  };
  render() {
    const { category } = this.props
    const { loading, paginationNumber } = this.state
    console.log(paginationNumber)
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Dark table */}
          
          {/* <Link to='socials'> */}
            <Button href='socials' variant='outline-danger'  type="button"> Back to socials </Button>
          {/* </Link> */}
          {/* <Button color="primary" type="button" onClick={() => this.toggleModal("CreateCategoryModal")} > <i fa fa-arrow-left></i> Back </Button> */}
          <Row className="mt-5">
          
            <div className="col">
              <Card className="bg-default shadow">
                <CardHeader className="bg-transparent border-0">
                  <h3 className="text-white mb-0">All Categories Data</h3>
                </CardHeader>
                {
                  category.length <= 1 || loading === true ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', zIndex: '10', marginTop: '80px' }}>
                    <Loader type="ThreeDots" color="#00BFFF" height={90} width={80} />
                  </div> :

                  <Table
                  className="align-items-center table-dark table-flush"
                  responsive
                >
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Name</th>
                      <th scope="col">Description</th>
                      <th scope="col">Hashtag</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      category.map((cat, i) => (
                        <tr key={cat._id}>
                      <td>
                        <span className="mb-0 text-sm">{cat._id}</span>
                      </td>
                      
                      <td>
                        <span className="mb-0 text-sm">{cat.name}</span>
                      </td>
                      
                      <td>
                        <span className="mb-0 text-sm">{cat.description}</span>
                      </td>
                      
                      <td>
                        <span className="mb-0 text-sm">{cat.hashtagName}</span>
                      </td>
                      {/* <th scope="row">
                        <Media className="align-items-center">
                          <a
                            className="avatar rounded-circle mr-3"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              src={cat.userImageURL}
                            />
                          </a>
                        </Media>
                      </th> */}

                      <th scope='row'>
                        <EditCategoryModal cat={cat}/>
                        <DeleteCategoryModal id={cat._id}/>
                      </th>
                    </tr>
                      ))
                    }
                    
                    
                    
                  </tbody>
                </Table>
                }
                
                {/* Page Pagination */}
                <ReactPaginate
                  previousLabel={'previous'}
                  nextLabel={'next'}
                  breakLabel={'...'}
                  breakClassName={'break-me'}
                  pageCount={this.state.pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  initialPage={0}
                  onPageChange={this.handlePageClick}
                  containerClassName={'pagination'}
                  subContainerClassName={'pages pagination'}
                  activeClassName={'paginate_active'}
                />
                {/* Page Pagination */}
              </Card>
            </div>
          </Row>
          
        </Container>
      </>
    );
  }
}

const mapStateToProps = ({ socials: { category } }) => {
  return {
    category
  }
}

const mapDispatchToProps = (dispatch) => ({
  getCategories: (pageNumber) => dispatch(handleGetCategories(pageNumber)),
})


export default connect(mapStateToProps, mapDispatchToProps)(Categories);
