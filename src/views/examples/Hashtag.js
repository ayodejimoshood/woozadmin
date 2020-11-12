import React from "react";

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
import { connect } from "react-redux";
import { handleGetHashtags } from "redux/actions/hashtag";
import DeleteHashtagModal from "./DeleteHashtagModal";
import EditHashtagModal from "./EditHashtagModal";

class Hashtag extends React.Component {
  state = {
    loading: true
  }

  componentDidMount() {
    this.props.getHashtags().then(res => {
      this.setState({
        loading: false
      })
    })
  }
  render() {
    const { hashtag } = this.props
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


                          <td className="text-right">
                            <UncontrolledDropdown>
                              <DropdownToggle
                                className="btn-icon-only text-light"
                                href="#pablo"
                                role="button"
                                size="sm"
                                color=""
                                onClick={(e) => e.preventDefault()}
                              >
                                <i className="fas fa-ellipsis-v" />
                              </DropdownToggle>
                              <DropdownMenu className="dropdown-menu-arrow" right>
                                <DropdownItem
                                  href="#pablo"
                                  onClick={(e) => e.preventDefault()}
                                >
                                  Edit
                            </DropdownItem>
                                <DropdownItem
                                  href="#pablo"
                                  onClick={(e) => e.preventDefault()}
                                >
                                  Delete
                            </DropdownItem>

                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </td>
                        </tr>

                      ))
                    }
                  </tbody>
                </Table>
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
  getHashtags: () => dispatch(handleGetHashtags())
})


export default connect(mapStateToProps, mapDispatchToProps)(Hashtag);
