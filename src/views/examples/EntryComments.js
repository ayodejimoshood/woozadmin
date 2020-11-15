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
import DeleteEntryCommentsModal from "./DeleteEntryCommentsModal";
import EditEntryCommentsModal from "./EditEntryCommentsModal";
import { handleGetEntriesComment } from "redux/actions/entriesComment";

class EntryComments extends React.Component {
  state ={
    request: true
  }
  componentDidMount() {
    this.props.getEntryComments().then(res => {
      this.setState(prev => ({
        request: !prev.request
      }))
    });
  }
  render() {
    const { entryComments } = this.props
    const { request } = this.state
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>

          <Button href='socials' variant='outline-danger' type="button"> Back to socials </Button>

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
                    {
                      entryComments.length > 0 && request === false ? entryComments.map((ent, i) => (
                        <tr key={ent._id}>
                          <td>
                            <span className="mb-0 text-sm">{i + 1}</span>
                          </td>

                          <td>
                            <span className="mb-0 text-sm">{ent.entryId}</span>
                          </td>

                          <th scope='row'>
                            <EditEntryCommentsModal ent={ent} />
                            <DeleteEntryCommentsModal id={ent._id} />
                          </th>
                        </tr>

                      )) : 
                      <tr>
                        <td> There is no entry comments data. Try creating one
                        </td>
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
const mapStateToProps = ({ socials: { entryComments } }) => {
  return {
    entryComments
  }
}

const mapDispatchToProps = (dispatch) => ({
  getEntryComments: () => dispatch(handleGetEntriesComment()),
})

export default connect(mapStateToProps, mapDispatchToProps)(EntryComments);
