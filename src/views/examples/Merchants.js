import React from "react";

// reactstrap components
import {
  Badge,
  Button,
  Col,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Modal,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
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
import CreateMerchantsModal from "../examples/CreateMerchantsModal";
import { connect } from "react-redux";
import { handleGetMerchants } from "redux/actions/merchant";

class Merchants extends React.Component {
  componentDidMount() {
    this.props.getMerchants()
  }
  render() {
    const { merchant } = this.props;
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
                      <h3 className="text-white mb-0">All Merchants Data</h3>
                    </Col>
                    <Col lg="2" className="ml-auto">
                      <CreateMerchantsModal />
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
                      <th scope="col">Vertical</th>

                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    merchant.map(mer => (
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
                              src={require("assets/img/brand/shoprite.jpg")}
                            />
                          </a>
                        </Media>
                      </th>
                      <td>
                        <span className="mb-0 text-sm">{mer.name}</span>
                      </td>

                      <td>
                        <span className="mb-0 text-sm">{mer.vertical}</span>
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

const mapStateToProps = ({merchant}) => ({
  merchant
})

const mapDispatchToProps = (dispatch) => ({
  getMerchants: () => dispatch(handleGetMerchants())
})

export default connect(mapStateToProps, mapDispatchToProps)(Merchants);
