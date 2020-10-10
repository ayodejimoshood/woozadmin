import React from "react";
import { connect } from 'react-redux'
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
import { handleGetUsers } from '../../redux/actions/users'

class Tables extends React.Component {
  state = {
    users: []
  }
  componentDidMount() {
    const {getUsers} = this.props;
    getUsers().then(data => {
      this.setState({
        users: this.props.users
      })
    })
  }
 
  render() {
    const {users} = this.state;
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
                  <h3 className="text-white mb-0">All Users Data</h3>
                </CardHeader>
                <Table
                  className="align-items-center table-dark table-flush"
                  responsive
                >
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">Avatar</th>
                      <th scope="col">Firstname</th>
                      <th scope="col">Lastname</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone Number</th>
                      <th scope="col">Account Type</th>
                      <th scope="col">Company</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  {users.map(user => (
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
                            src={user.imageUrl ? user.imageUrl : require("assets/img/theme/avatar.jpg")}
                          />
                        </a>
                      </Media>
                    </th>
                    
                    <td>
                      <span className="mb-0 text-sm">{user.firstName}</span>
                    </td>
                    <td>
                      {" "}
                      <span className="mb-0 text-sm">{user.lastName}</span>
                    </td>
                    <td>
                      <span className="mb-0 text-sm">
                        {user.email}
                      </span>
                    </td>
                    <td>
                      <span className="mb-0 text-sm">
                        {user.phone}
                      </span>
                    </td>
                    
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">{user.accountType}</span>
                        
                      </div>
                    </td>
                    <td>
                      <span className="mb-0 text-sm">
                        Google
                      </span>
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
                  ))}
                    
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

const mapStateToProps = ({ users }) => {
  return {
    users: users.users
  }
}

const mapDispatchToProps = (dispatch) => ({
  getUsers: () => dispatch(handleGetUsers())
})

export default connect(mapStateToProps, mapDispatchToProps)(Tables);
