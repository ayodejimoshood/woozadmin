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
import { connect } from 'react-redux'
import EditEntryDataModal from "./EditEntryDataModal";
import EditEntriesModal from "./EditEntriesModal";
import DeleteEntriesModal from "./DeleteEntriesModal";
import { handleGetEntries } from "redux/actions/entries";

class Entries extends React.Component {
  componentDidMount() {
    this.props.getEntries();
  }
  render() {
    const { entries} = this.props
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
                  <h3 className="text-white mb-0">All Entries Data</h3>
                </CardHeader>
                <Table
                  className="align-items-center table-dark table-flush"
                  responsive
                >
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">User Name</th>
                      <th scope="col">Challenge Name</th>
                      <th scope="col">Category Name</th>
                      <th scope="col">Hashtag Name</th>
                      <th scope="col">Image URL</th>
                      <th scope="col">Media Image URL</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    entries.map((ent, i) => (
                      <tr key={ent._id}>
                      <td>
                        <span className="mb-0 text-sm">{i + 1}</span>
                      </td>
                      <td>
                        <span className="mb-0 text-sm">{ent.userFirstName + ' ' + ent.userLastName}</span>
                      </td>
                      <td>
                        <span className="mb-0 text-sm">{ent.challengeName}</span>
                      </td>

                      <td>
                        <span className="mb-0 text-sm">{ent.categoryName}</span>
                      </td>
                      <td>
                        <span className="mb-0 text-sm">{ent.hashtagName}</span>
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
                              src={ent.imageURL}
                            />
                          </a>
                        </Media>
                      </th>
                      <th scope="row">
                        <Media className="align-items-center">
                          <a
                            className="avatar rounded-circle mr-3"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              src={ent.mediaURL}
                            />
                          </a>
                        </Media>
                      </th>

                      <th scope='row'>
                        <EditEntriesModal ent={ent}/>
                        <DeleteEntriesModal id={ent._id}/>
                      </th>
                      
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

const mapStateToProps = ({ socials: { entries } }) => {
  return {
    entries
  }
}

const mapDispatchToProps = (dispatch) => ({
  getEntries: () => dispatch(handleGetEntries()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Entries);
