import React from "react";
import { Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../redux/actions/auth";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import { JsxEmit } from "typescript";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
  };

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const { history, loginUser } = this.props;
    loginUser({ email, password }, history);
  };

  render() {
    if (this.props.token) {
      return <Redirect to="/" />;
    }

    const { email, password } = this.state;
    return (
      <>
        <Col lg="5" md="7">
          <div className="text-center text-muted mb-4">
            <span className="btn-inner--icon">
              <img
                alt="..."
                width="200px"
                src={require("../../assets/img/brand/woozeee.png")}
              />
            </span>
          </div>

          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <Form role="form" onSubmit={this.handleSubmit}>
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Email"
                      type="email"
                      autoComplete="new-email"
                      value={email}
                      name="email"
                      required
                      onChange={(e) => this.handleChange(e)}
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Password"
                      type="password"
                      value={password}
                      name="password"
                      required
                      onChange={(e) => this.handleChange(e)}
                    />
                  </InputGroup>
                </FormGroup>
                <div className="custom-control custom-control-alternative custom-checkbox">
                  <input
                    className="custom-control-input"
                    id=" customCheckLogin"
                    type="checkbox"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor=" customCheckLogin"
                  >
                    <span className="text-muted">Remember me</span>
                  </label>
                </div>
                <div className="text-center">
                  <Button style={{backgroundColor: '#043f7c'}} className="my-4" color="primary" type="submit">
                    Sign in
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
          <Row className="mt-3">
            <Col xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <small>Forgot password?</small>
              </a>
            </Col>
          </Row>
        </Col>
      </>
    );
  }
}

const mapStateToProps = ({ auth: { token } }) => ({
  token,
});

const mapDispatchToProps = (dispatch) => ({
  loginUser: (userObject, history) => dispatch(login(userObject, history)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
