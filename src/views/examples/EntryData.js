import React from "react";
import { connect } from 'react-redux'
import ReactPaginate from 'react-paginate';
import Loader from 'react-loader-spinner'
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
import EditEntryDataModal from "./EditEntryDataModal";
import DeleteEntryDataModal from "./DeleteEntryDataModal";
import { handleGetEntriesData } from "redux/actions/entryData";
import { calculatePagination } from "utils/helpers";

class EntryData extends React.Component {
  state = {
    loading: true,
    paginationNumber: 1,
    pageCount: 1,
    perPage: 10
  }


  componentDidMount() {
    this.props.getEntryDatas(this.state.paginationNumber).then(res => {
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
      this.props.getEntryDatas(this.state.paginationNumber).then(res => {
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
    const { entryDatas, request } = this.props
    const { loading } = this.state
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Dark table */}

          {/* <Link to='socials'> */}
          <Button href='socials' variant='outline-danger' type="button"> Back to socials </Button>
          {/* </Link> */}
          {/* <Button color="primary" type="button" onClick={() => this.toggleModal("CreateCategoryModal")} > <i fa fa-arrow-left></i> Back </Button> */}
          <Row className="mt-5">

            <div className="col">
              <Card className="bg-default shadow">
                <CardHeader className="bg-transparent border-0">
                  <h3 className="text-white mb-0">All EntryData Data</h3>
                </CardHeader>
                {
                  entryDatas.length <= 1 || loading === true ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', zIndex: '10', marginTop: '80px' }}>
                    <Loader type="ThreeDots" color="#00BFFF" height={90} width={80} />
                  </div> :

                  <Table
                  className="align-items-center table-dark table-flush"
                  responsive
                >
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Category Name</th>
                      <th scope="col">Entry Image</th>
                      <th scope="col">Sponsor ID</th>
                      <th scope="col">Is Like</th>
                      <th scope="col">Sponsor Image</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      entryDatas.length > 0 && !request ? entryDatas.map((ent, i) => (
                        <tr key={ent._id}>
                          <td>
                            <span className="mb-0 text-sm">{ent._id}</span>
                          </td>

                          <td>
                            <span className="mb-0 text-sm">{ent.categoryName}</span>
                          </td>

                          <th scope="row">
                            <Media className="align-items-center">
                              <a
                                className="avatar rounded-circle mr-3"
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                <img
                                  alt="..."
                                  src={ent.entryImageURL}
                                />
                              </a>
                            </Media>
                          </th>

                          <td>
                            <span className="mb-0 text-sm">{ent.sponsorId}</span>
                          </td>

                          <td>
                            <span className="mb-0 text-sm">{ent.isLike}</span>
                          </td>

                          <th scope="row">
                            <Media className="align-items-center">
                              <a
                                className="avatar rounded-circle mr-3"
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                <img
                                  alt="..."
                                  src={ent.entryMediaURL}
                                />
                              </a>
                            </Media>
                          </th>

                          <th scope='row'>
                            <EditEntryDataModal ent={ent} />
                            <DeleteEntryDataModal ent={ent} />
                          </th>

                        </tr>
                      ))
                        
                        :
                        <tr>
                          <td>There is no entrydata comment. Try adding one</td>
                        </tr>
                    }


                  </tbody>
                </Table>
                }
                
              </Card>
            </div>
          </Row>
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
        </Container>
      </>
    );
  }
}

const mapStateToProps = ({ socials: { entryDatas } }) => {
  return {
    entryDatas
  }
}

const mapDispatchToProps = (dispatch) => ({
  getEntryDatas: (pageNumber) => dispatch(handleGetEntriesData(pageNumber)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EntryData);
