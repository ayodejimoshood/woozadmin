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
import DeleteEntryCommentsModal from "./DeleteEntryCommentsModal";
import EditEntryCommentsModal from "./EditEntryCommentsModal";

class EntryComments extends React.Component {
  
  render() {
    // const { EntryComments} = this.props
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          
          <Button href='socials' variant='outline-danger'  type="button"> Back to socials </Button>
          
          <Row className="mt-5">
          
            <div className="col">
              <Card className="bg-default shadow">
                <CardHeader className="bg-transparent border-0">
                  <h3 className="text-white mb-0">All EntryComments Data</h3>
                </CardHeader>
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
                  
                    <tr>
                      <td>
                        <span className="mb-0 text-sm">1</span>
                      </td>
                      
                      <td>
                        <span className="mb-0 text-sm">Entry Comment ID</span>
                      </td>

                      <th scope='row'>
                        <EditEntryCommentsModal/>
                        <DeleteEntryCommentsModal/>
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

export default EntryComments;