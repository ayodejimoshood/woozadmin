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
import EditChallengesModal from "./EditChallengesModal";
import DeleteChallengesModal from "./DeleteChallengesModal";
import { handleGetChallenges } from "redux/actions/challenges";
import { connect } from "react-redux";

class Challenges extends React.Component {
  componentDidMount() {
    this.props.getChallenges();
  }
  render() {
    const { challenges} = this.props
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
                  <h3 className="text-white mb-0">All Challenges Data</h3>
                </CardHeader>
                <Table
                  className="align-items-center table-dark table-flush"
                  responsive
                >
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Challenge Hashtag</th>
                      {/* <th scope="col">Category ID</th> */}
                      <th scope="col">Category Name</th>
                      {/* <th scope="col">Category Image</th> */}
                      {/* <th scope="col">Sponsor ID</th> */}
                      <th scope="col">Sponsor Name</th>
                      <th scope="col">Challenge Image</th>
                      <th scope="col">Challenge Name</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    challenges.map((chal, i) => (
                      <tr key={chal._id}>
                      <td>
                        <span className="mb-0 text-sm">{i + 1}</span>
                      </td>
                      
                      <td>
                        <span className="mb-0 text-sm">{chal.hashtagName}</span>
                      </td>

                      {/* <td>
                        <span className="mb-0 text-sm">{chal.categoryId}</span>
                      </td> */}

                      <td>
                        <span className="mb-0 text-sm">{chal.categoryName}</span>
                      </td>

                      {/* <th scope="row">
                        <Media className="align-items-center">
                          <a
                            className="avatar rounded-circle mr-3"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              src={chal.categoryimageURL}
                            />
                          </a>
                        </Media>
                      </th> */}

                      {/* <td>
                        <span className="mb-0 text-sm">{chal.sponsorId}</span>
                      </td> */}

                      <td>
                        <span className="mb-0 text-sm">{chal.sponsorName}</span>
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
                              src={chal.imageURL}
                            />
                          </a>
                        </Media>
                      </th>

                      <td>
                        <span className="mb-0 text-sm">{chal.name}</span>
                      </td>
                      
                      <th scope='row'>
                        <EditChallengesModal chal={chal}/>
                        <DeleteChallengesModal id={chal._id}/>
                      </th>
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

const mapStateToProps = ({ socials: { challenges } }) => {
  return {
    challenges
  }
}

const mapDispatchToProps = (dispatch) => ({
  getChallenges: () => dispatch(handleGetChallenges()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Challenges);
