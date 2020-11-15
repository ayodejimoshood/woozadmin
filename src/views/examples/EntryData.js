import React from "react";
import { connect } from 'react-redux'
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

class EntryData extends React.Component {
  state = {
    request: true
  }
  componentDidMount() {
    this.props.getEntryDatas().then(res => {
      this.setState(prev => ({
        request: !prev.request
      }))
    });
  }
  render() {
    const { entryDatas, request } = this.props
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
                            <span className="mb-0 text-sm">{i + 1}</span>
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
              </Card>
            </div>
          </Row>
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
  getEntryDatas: () => dispatch(handleGetEntriesData()),
})

export default connect(mapStateToProps, mapDispatchToProps)(EntryData);
