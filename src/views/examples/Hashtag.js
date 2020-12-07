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
  Table,
  Container,
  Row,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { handleGetHashtags } from "redux/actions/hashtag";
import DeleteHashtagModal from "./DeleteHashtagModal";
import EditHashtagModal from "./EditHashtagModal";
import { handleDeleteHashtag } from "redux/actions/hashtag";

class Hashtag extends React.Component {
  state = {
    loading: true,
    pageCount: 1,
    perPage: 10,
    paginationNumber: 1
  }

  componentDidMount() {
    this.props.getHashtags(this.state.paginationNumber).then(res => {
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
      this.props.getHashtags(this.state.paginationNumber).then(res => {
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
    const { hashtag } = this.props
    const { loading } = this.state
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Dark table */}

          {/* <Link to='socials'>
            <Button color="warning" type="button"> Back </Button>
          </Link> */}
          <Button href='socials' variant='outline-danger' type="button"> Back to socials </Button>
          {/* <Button color="primary" type="button" onClick={() => this.toggleModal("CreateCategoryModal")} > <i fa fa-arrow-left></i> Back </Button> */}
          <Row className="mt-5">

            <div className="col">
              <Card className="bg-default shadow">
                <CardHeader className="bg-transparent border-0">
                  <h3 className="text-white mb-0">All Hashtag Data</h3>
                </CardHeader>
                {
                  hashtag.length <= 1 || loading === true ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', zIndex: '10', marginTop: '80px' }}>
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
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        hashtag.map(hash => (
                          <tr key={hash._id}>
                            <td>
                              <span className="mb-0 text-sm">{hash._id}</span>
                            </td>

                            <td>
                              <span className="mb-0 text-sm">{hash.name}</span>
                            </td>
                            <th scope='row'>
                              <EditHashtagModal hash={hash} />
                              <DeleteHashtagModal id={hash._id} />
                            </th>
                          </tr>

                        ))
                      }
                    </tbody>
                  </Table>
                }

                {/*  */}
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
                {/*  */}
              </Card>
            </div>
          </Row>
          
        </Container>
      </>
    );
  }
}


const mapStateToProps = ({ socials: { hashtag } }) => {
  return {
    hashtag
  }
}

const mapDispatchToProps = (dispatch) => ({
  getHashtags: (pagNumber) => dispatch(handleGetHashtags(pagNumber)),
  deleteHashtag: (id) => dispatch(handleDeleteHashtag(id))
})


export default connect(mapStateToProps, mapDispatchToProps)(Hashtag);
