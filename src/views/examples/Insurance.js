import React from "react";

// reactstrap components
import {
  Badge,
  Card,
  Col,
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
import CreateInsuranceModal from "../examples/CreateInsuranceModal";

class Insurance extends React.Component {
  render() {
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
                <Row>
                    <Col lg="10">
                      <h3 className="text-white mb-0">All Insurance Data</h3>
                    </Col>
                    <Col lg="2" className="ml-auto">
                      <CreateInsuranceModal />
                    </Col>
                  </Row>
                </CardHeader>
                <Table
                  className="align-items-center table-dark table-flush"
                  responsive
                >
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">Avatar</th>
                      <th scope="col">Name</th>
                      <th scope="col">Category</th>
                      <th scope="col">Cover Type</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
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
                              src={require("assets/img/brand/axa.png")}
                            />
                          </a>
                        </Media>
                      </th>
                      <td>
                        <span className="mb-0 text-sm">AXA Mansard</span>
                      </td>
                      <td>
                        {" "}
                        <span className="mb-0 text-sm">Travel</span>
                      </td>
                      <td>
                        {" "}
                        <span className="mb-0 text-sm">General Protection</span>
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

export default Insurance;
