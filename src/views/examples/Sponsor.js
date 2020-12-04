import React from "react";
import Loader from 'react-loader-spinner'
import './style.css'
import ReactPaginate from 'react-paginate';
// reactstrap components
import {
  Badge,
  Card,
  Button,
  CardHeader,
  Media,
  Table,
  Container,
  Row,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import EditSponsorModal from "./EditSponsorModal";
import DeleteSponsorModal from "./DeleteSponsorModal";
// import { handleGetSponsor } from "redux/actions/Sponsor";
import { connect } from "react-redux";
import { handleGetSponsors } from "redux/actions/sponsors";
import { handleDeleteSponsor } from "redux/actions/sponsors";
import { calculatePagination } from "utils/helpers";

class Sponsor extends React.Component {
  state = {
    loading: true,
    paginationNumber: 1,
    pageCount: 1,
    perPage: 10
  }
  componentDidMount() {
    this.props.getSponsors(this.state.paginationNumber).then(res => {
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
      this.props.getSponsors(this.state.paginationNumber).then(res => {
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
    const { sponsors } = this.props
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
                  <h3 className="text-white mb-0">All Sponsor Data</h3>
                </CardHeader>
                {
                  sponsors.length <= 1 ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', zIndex: '10', marginTop: '80px' }}>
                    <Loader type="TailSpin" color="#00BFFF" height={90} width={80} />
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
                      {/* <th scope="col">Hashtag</th> */}
                      <th scope="col">Image</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                 

                    {
                      sponsors.map(sponsor => (
                        <tr key={sponsor._id}>
                          <td>
                            <span className="mb-0 text-sm">{sponsor._id}</span>
                          </td>

                          <td>
                            <span className="mb-0 text-sm">{sponsor.name}</span>
                          </td>

                          <td>
                            <span className="mb-0 text-sm">{sponsor.description}</span>
                          </td>
                          {/* <td>
                            <span className="mb-0 text-sm">{sponsor.hashtag}</span>
                          </td> */}
                          <th scope="row">
                            <Media className="align-items-center">
                              <a
                                className="avatar rounded-circle mr-3"
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                <img
                                  alt="..."
                                  src={sponsor.imageURL}
                                />
                              </a>
                            </Media>
                          </th>
                          <th scope='row'>
                            <EditSponsorModal sponsor={sponsor} />
                            <DeleteSponsorModal id={sponsor._id} />
                          </th>
                        </tr>
                      ))
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

const mapStateToProps = ({ socials: { sponsors } }) => {
  return {
    sponsors
  }
}

const mapDispatchToProps = (dispatch) => ({
  getSponsors: (pagNumber) => dispatch(handleGetSponsors(pagNumber)),
  deleteSponsor: (id) => dispatch(handleDeleteSponsor(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Sponsor);
