import React from "react";

// reactstrap components
import {
  Badge,
  Button,
  Col,
  Card,
  CardBody,
  CardTitle,
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
import CreateCategoryModal from "./CreateCategoryModal";
import CreateHashtagModal from "./CreateHashtagModal";
import CreateSponsorModal from "./CreateSponsorModal";
import CreateChallengesModal from './CreateChallengesModal';
import CreateEntriesModal from  './CreateEntriesModal';
import CreateEntryCommentsModal from './CreateEntryCommentsModal';
import CreateEntryDataModal from './CreateEntryDataModal';
import CreateUserStoriesModal from './CreateUserStoriesModal'

class Socials extends React.Component {
  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Dark table */}
            <Row>
              <Col lg="6" xl="4">
                <Card className="shadow mb-4">
                  <CardHeader className="bg-transparent">
                    <Row className="align-items-center">
                      <div className="col">
                        <h4 className="mb-0">Hashtag</h4>
                      </div>
                      <Col className="col-auto">
                          <CreateHashtagModal/>
                      </Col>
                    </Row>
                  </CardHeader>
                </Card>
              </Col>  
              <Col lg="6" xl="4">
                <Card className="shadow mb-4">
                  <CardHeader className="bg-transparent">
                    <Row className="align-items-center">
                      <div className="col">
                        <h4 className="mb-0">Category</h4>
                      </div>
                      <Col className="col-auto">
                          <CreateCategoryModal/>
                      </Col>
                    </Row>
                  </CardHeader>
                </Card>
              </Col>

              
              <Col lg="6" xl="4">
                <Card className="shadow mb-4">
                  <CardHeader className="bg-transparent">
                    <Row className="align-items-center">
                      <div className="col">
                        <h4 className="mb-0">Sponsors</h4>
                      </div>
                      <Col className="col-auto">
                          <CreateSponsorModal/>
                      </Col>
                    </Row>
                  </CardHeader>
                </Card>
              </Col>
              <Col lg="6" xl="4">
                <Card className="shadow mb-4">
                  <CardHeader className="bg-transparent">
                    <Row className="align-items-center">
                      <div className="col">
                        <h4 className="mb-0">Challenges</h4>
                      </div>
                      <Col className="col-auto">
                          <CreateChallengesModal/>
                      </Col>
                    </Row>
                  </CardHeader>
                </Card>
              </Col>
              <Col lg="6" xl="4">
                <Card className="shadow mb-4">
                  <CardHeader className="bg-transparent">
                    <Row className="align-items-center">
                      <div className="col">
                        <h4 className="mb-0">Entries</h4>
                      </div>
                      <Col className="col-auto">
                          <CreateEntriesModal/>
                      </Col>
                    </Row>
                  </CardHeader>
                </Card>
              </Col>
              <Col lg="6" xl="4">
                <Card className="shadow mb-4">
                  <CardHeader className="bg-transparent">
                    <Row className="align-items-center">
                      <div className="col">
                        <h4 className="mb-0">Entry Comments</h4>
                      </div>
                      <Col className="col-auto">
                          <CreateEntryCommentsModal/>
                      </Col>
                    </Row>
                  </CardHeader>
                </Card>
              </Col>
              <Col lg="6" xl="4">
                <Card className="shadow mb-4">
                  <CardHeader className="bg-transparent">
                    <Row className="align-items-center">
                      <div className="col">
                        <h4 className="mb-0">Entry Data</h4>
                      </div>
                      <Col className="col-auto">
                          <CreateEntryDataModal/>
                      </Col>
                    </Row>
                  </CardHeader>
                </Card>
              </Col>
              <Col lg="6" xl="4">
                <Card className="shadow mb-4">
                  <CardHeader className="bg-transparent">
                    <Row className="align-items-center">
                      <div className="col">
                        <h4 className="mb-0">User Stories</h4>
                      </div>
                      <Col className="col-auto">
                          <CreateUserStoriesModal/>
                      </Col>
                    </Row>
                  </CardHeader>
                </Card>
              </Col>
              
            </Row>
        </Container>
      </>
    );
  }
}

export default Socials;
