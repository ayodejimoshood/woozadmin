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
import DeleteCategoryModal from "./DeleteCategoryModal";
import EditCategoryModal from "./EditCategoryModal";
// import { handleGetCategories } from "redux/actions/Categories";
// import { connect } from "react-redux";

class Categories extends React.Component {
  
  render() {
    // const { Categories} = this.props
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
                  <h3 className="text-white mb-0">All Categories Data</h3>
                </CardHeader>
                <Table
                  className="align-items-center table-dark table-flush"
                  responsive
                >
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Description</th>
                      <th scope="col">Name</th>
                      <th scope="col">Hashtag</th>
                      <th scope="col">Image</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  
                    <tr>
                      <td>
                        <span className="mb-0 text-sm">1</span>
                      </td>
                      
                      <td>
                        <span className="mb-0 text-sm">Categories Description</span>
                      </td>
                      <td>
                        <span className="mb-0 text-sm">Categories Name</span>
                      </td>
                      <td>
                        <span className="mb-0 text-sm">Categories Hashtag</span>
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
                              src={require("assets/img/brand/shoprite.jpg")}
                            />
                          </a>
                        </Media>
                      </th>

                      <th scope='row'>
                        <EditCategoryModal/>
                        <DeleteCategoryModal/>
                      </th>
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

export default Categories;
