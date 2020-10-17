import React from "react";

// reactstrap components
import {
  Badge,
  Card,
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
import { handleGetVerticals } from "redux/actions/verticals";
import { connect } from "react-redux";

class Verticals extends React.Component {
  componentDidMount() {
    this.props.getVerticals()
  }
  render() {
    const { verticals} = this.props
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Dark table */}
          <Row className="mt-5">
            <div className="col">
              <Card className="bg-default shadow">
                <CardHeader className="bg-transparent border-0">
                  <h3 className="text-white mb-0">All Verticals Data</h3>
                </CardHeader>
                <Table
                  className="align-items-center table-dark table-flush"
                  responsive
                >
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">Avatar</th>
                      <th scope="col">Name</th>
                      
                      <th scope="col">ID</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    verticals.map(vertical => (
                      <tr>
                      <th scope="row">
                        <Media className="align-items-center">
                          <a
                            className="avatar rounded-circle mr-3"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              src={require("assets/img/icons/click-shop.png")}
                            />
                          </a>
                        </Media>
                      </th>
                      <td>
                        <span className="mb-0 text-sm">{vertical.name}</span>
                      </td>
                      <td>
                        <span className="mb-0 text-sm">{vertical.id}</span>
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

const mapStateToProps = ({verticals}) => ({
  verticals
})

const mapDispatchToProps = (dispatch) => ({
  getVerticals: () => dispatch(handleGetVerticals()) 
})

export default connect(mapStateToProps, mapDispatchToProps)(Verticals);
