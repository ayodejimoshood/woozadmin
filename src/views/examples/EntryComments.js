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
import DeleteEntryCommentsModal from "./DeleteEntryCommentsModal";
import EditEntryCommentsModal from "./EditEntryCommentsModal";
import { handleGetEntriesComment } from "redux/actions/entriesComment";
import { calculatePagination } from "utils/helpers";

class EntryComments extends React.Component {
  state ={
    request: true,
    loading: true,
    paginationNumber: 1,
    pageCount: 1,
    perPage: 10
  }
  componentDidMount() {
    this.props.getEntryComments(this.state.paginationNumber).then(res => {
      if (res?.message === 'success') {
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
      this.props.getEntryComments(this.state.paginationNumber).then(res => {
        if (res?.message === 'success') {
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
    const { entryComments } = this.props
    const { request, loading } = this.state
    console.log(entryComments)
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>

          <Button href='socials' variant='outline-danger' type="button"> Back to socials </Button>

          <Row className="mt-5">

            <div className="col">
              <Card className="bg-default shadow">
                <CardHeader className="bg-transparent border-0">
                  <h3 className="text-white mb-0">All EntryComments Data</h3>
                </CardHeader>
                {
                  entryComments.length <= 1 || loading === true ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', zIndex: '10', marginTop: '80px' }}>
                    <Loader type="ThreeDots" color="#00BFFF" height={90} width={80} />
                  </div> :
                  <Table
                  className="align-items-center table-dark table-flush"
                  responsive
                >
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Entry Comment ID</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      entryComments.length > 0 ? entryComments.map((ent, i) => (
                        <tr key={ent._id}>
                          <td>
                            <span className="mb-0 text-sm">{ent._id}</span>
                          </td>

                          <td>
                            <span className="mb-0 text-sm">{ent.entryId}</span>
                          </td>

                          <th scope='row'>
                            <EditEntryCommentsModal ent={ent} />
                            <DeleteEntryCommentsModal id={ent._id} />
                          </th>
                        </tr>

                      )) : 
                      <tr>
                        <td> There is no entry comments data. Try creating one
                        </td>
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
const mapStateToProps = ({ socials: { entryComments } }) => {
  return {
    entryComments
  }
}

const mapDispatchToProps = (dispatch) => ({
  getEntryComments: (pageNum) => dispatch(handleGetEntriesComment(pageNum)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EntryComments);
