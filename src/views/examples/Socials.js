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
import { Link } from "react-router-dom";

class Socials extends React.Component {
  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Dark table */}
            <Row>
              {/* Hashtag */}
              <Col lg="6" xl="4">
                <Card className="shadow mb-4">
                  <CardHeader className="bg-transparent">
                    <Row className="align-items-center">
                      <div className="col">
                        <h4 className="mb-0">Hashtag</h4>
                      </div>
                      {/* <Col className="col-auto"> */}
                        
                        <Button href='hashtag' color='danger'> View </Button>
                      {/* </Col> */}
                      <Col className="col-auto">
                          <CreateHashtagModal/>
                      </Col>
                    </Row>
                  </CardHeader>
                </Card>
              </Col>
              {/* Hashtag */}

              {/* Category */}
              <Col lg="6" xl="4">
                <Card className="shadow mb-4">
                  <CardHeader className="bg-transparent">
                    <Row className="align-items-center">
                      <div className="col">
                        <h4 className="mb-0">Category</h4>
                      </div>
                      <Button href='categories' color='danger'> View </Button>
                      <Col className="col-auto">
                          <CreateCategoryModal/>
                      </Col>
                    </Row>
                  </CardHeader>
                </Card>
              </Col>
              {/* Category */}

              {/* Sponsor */}
              <Col lg="6" xl="4">
                <Card className="shadow mb-4">
                  <CardHeader className="bg-transparent">
                    <Row className="align-items-center">
                      <div className="col">
                        <h4 className="mb-0">Sponsors</h4>
                      </div>
                      <Button href='sponsor' color='danger'> View </Button>
                      <Col className="col-auto">
                          <CreateSponsorModal/>
                      </Col>
                    </Row>
                  </CardHeader>
                </Card>
              </Col>
              {/* Sponsor */}

              {/* Challenges */}
              <Col lg="6" xl="4">
                <Card className="shadow mb-4">
                  <CardHeader className="bg-transparent">
                    <Row className="align-items-center">
                      <div className="col">
                        <h4 className="mb-0">Challenges</h4>
                      </div>
                      <Button href='challenges' color='danger'> View </Button>
                      <Col className="col-auto">
                          <CreateChallengesModal/>
                      </Col>
                    </Row>
                  </CardHeader>
                </Card>
              </Col>
              {/* Challenges */}

              {/* Entries */}
              <Col lg="6" xl="4">
                <Card className="shadow mb-4">
                  <CardHeader className="bg-transparent">
                    <Row className="align-items-center">
                      <div className="col">
                        <h4 className="mb-0">Entries</h4>
                      </div>
                      <Button href='entries' color='danger'> View </Button>
                      <Col className="col-auto">
                          <CreateEntriesModal/>
                      </Col>
                    </Row>
                  </CardHeader>
                </Card>
              </Col>
              {/* Entries */}

              {/* Entry Data */}
              <Col lg="6" xl="4">
                <Card className="shadow mb-4">
                  <CardHeader className="bg-transparent">
                    <Row className="align-items-center">
                      <div className="col">
                        <h4 className="mb-0">Entry Data</h4>
                      </div>
                      <Button href='entrydata' color='danger'> View </Button>
                      <Col className="col-auto">
                          <CreateEntryDataModal/>
                      </Col>
                    </Row>
                  </CardHeader>
                </Card>
              </Col>
              {/* Entry Data */}

              {/* User Stories */}
              <Col lg="6" xl="4">
                <Card className="shadow mb-4">
                  <CardHeader className="bg-transparent">
                    <Row className="align-items-center">
                      <div className="col">
                        <h4 className="mb-0">User Stories</h4>
                      </div>
                      <Button href='userstories' color='danger'> View </Button>
                      <Col className="col-auto">
                          <CreateUserStoriesModal/>
                      </Col>
                    </Row>
                  </CardHeader>
                </Card>
              </Col>
              {/* User Stories */}

              {/* Entry Comments */}
              <Col lg="6" xl="4">
                <Card className="shadow mb-4">
                  <CardHeader className="bg-transparent">
                    <Row className="align-items-center">
                      <div className="col">
                        <h4 className="mb-0">EntryComments</h4>
                      </div>
                      <Button href='entrycomments' color='danger'> View </Button>
                      <Col className="col-auto">
                          <CreateEntryCommentsModal/>
                      </Col>
                    </Row>
                  </CardHeader>
                </Card>
              </Col>
              {/* Entry Comments */}
              
            </Row>
        </Container>
      </>
    );
  }
}

export default Socials;