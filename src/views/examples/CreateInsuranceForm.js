import React from "react";

// reactstrap components
import {
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";

class CreateInsuranceForm extends React.Component {
  render() {
    return (
      <>
        <Form>
          <Row>
            <Col md="12">
              <FormGroup>
                <Input
                  id="exampleFormControlInput1"
                  placeholder="merchant name"
                  type="text"
                />
              </FormGroup>
            </Col>
            <Col md="12">
              <FormGroup>
                <Input
                  id="exampleFormControlInput1"
                  placeholder="vertical"
                  type="text"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
          <Col md="12">
              <FormGroup>
                <Input
                  id="exampleFormControlInput1"
                  placeholder="attributes"
                  type="text"
                />
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </>
    );
  }
}

export default CreateInsuranceForm;
